import React, { useState } from "react";
import { Image, Alert, Dimensions } from "react-native";
import styled from "styled-components";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { useMutation } from "@apollo/client";
import { UPLOAD_POST, VIEW_FEED } from "../../queries/Main/MainQueries";
import colors from "../../colors";
import Button from "../../components/Button";

const { width } = Dimensions.get("screen");

const View = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.ScrollView`
  flex: 1;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray};
`;

const Form = styled.View`
  flex: 7;
  justify-content: center;
  align-items: center;
`;

const STextInput = styled.TextInput`
  width: ${width / 1.2}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray};
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

export default ({ navigation, route }) => {
  const photo = route.params.photo;
  const [loading, setIsLoading] = useState(false);
  const captionInput = useInput("");
  const locationInput = useInput("");

  const [uploadMutation] = useMutation(UPLOAD_POST, {
    variables: {
      caption: captionInput.value,
      location: locationInput.value,
    },
    refetchQueries: () => [{ query: VIEW_FEED }],
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const item of photo) {
      const name = item.filename;
      const [, type] = name.split(".");
      console.log(type);
      formData.append("file", {
        name: item.filename,
        type: `image/${type.toLowerCase()}`,
        uri: item.uri,
      });
    }
    console.log(formData);
    try {
      setIsLoading(true);
      console.log("1");
      const {
        data: { locations },
      } = await axios.post(
        "https://api-coco.herokuapp.com/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log("2");
      const {
        data: { uploadPost },
      } = await uploadMutation({
        variables: {
          files: [...locations],
        },
      });
      console.log("3");
      if (uploadPost.id) {
        navigation.navigate("Feed");
      }
      console.log("4");
    } catch (error) {
      console.log(error);
      Alert.alert("エラー", "もう一度アップロードしてください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Container
        horizontal={true}
        contentContainerStyle={{ alignItems: "center", paddingHorizontal: 10 }}
      >
        {photo.map((photo) => (
          <Image
            key={photo.id}
            source={{ uri: photo.uri }}
            style={{ height: 80, width: 80, marginRight: 10 }}
          />
        ))}
      </Container>
      <Form>
        <STextInput
          onChangeText={locationInput.onChange}
          value={locationInput.value}
          placeholder="位置"
          multiline={true}
        />
        <STextInput
          onChangeText={captionInput.onChange}
          value={captionInput.value}
          placeholder="本文"
          multiline={true}
        />
        <Button
          loading={loading}
          text={"投稿"}
          accent={true}
          onPress={handleSubmit}
        />
      </Form>
    </View>
  );
};
