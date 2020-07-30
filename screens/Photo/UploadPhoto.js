import React, { useState } from "react";
import { Image, Alert, Dimensions } from "react-native";
import styled from "styled-components";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { UPLOAD_POST, VIEW_FEED } from "../../queries/Main/MainQueries";
import colors from "../../colors";
import Button from "../../components/Button";

const { width } = Dimensions.get("screen");

const View = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  border: 1px;
`;

const Form = styled.View`
  flex: 7;
  justify-content: center;
  align-items: center;
`;

const STextInput = styled.TextInput`
  width: ${width / 1.2}px;
  border-color: ${colors.gray};
  border-bottom-width: 1px;
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
    const name = photo.filename;
    const [, type] = name.split(".");
    formData.append("file", {
      name: photo.filename,
      type: type.toLowerCase(),
      uri: photo.uri,
    });
    try {
      setIsLoading(true);
      const {
        data: { location },
      } = await axios.post("http://localhost:4000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      const {
        data: { uploadPost },
      } = await uploadMutation({
        variables: {
          files: [location],
        },
      });
      if (uploadPost.id) {
        navigation.navigate("Feed");
      }
    } catch (error) {
      Alert.alert("エラー", "もう一度アップロードしてください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
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
