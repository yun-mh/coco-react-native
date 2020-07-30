import React, { useState } from "react";
import { Image, Alert, Dimensions } from "react-native";
import styled from "styled-components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from "react-native-web-swiper";
import axios from "axios";
import useInput from "../../../hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import {
  UPLOAD_POST,
  VIEW_FEED,
  EDIT_POST,
} from "../../../queries/Main/MainQueries";
import colors from "../../../colors";
import Button from "../../../components/Button";

const { width } = Dimensions.get("screen");

const View = styled.View`
  flex: 1;
  background-color: white;
`;

const SlideContainer = styled.View`
  margin-bottom: 10px;
  overflow: hidden;
  width: 100%;
  height: ${hp("50%")}px;
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
  const [loading, setIsLoading] = useState(false);
  const id = route.params.id;
  const [files, setFiles] = useState(route.params.files);
  const captionInput = useInput(route.params.caption);
  const locationInput = useInput(route.params.location);

  // const [uploadMutation] = useMutation(UPLOAD_POST, {
  //   variables: {
  //     caption: captionInput.value,
  //     location: locationInput.value,
  //   },
  //   refetchQueries: () => [{ query: VIEW_FEED }],
  // });

  const [editPostMutation] = useMutation(EDIT_POST, {
    variables: {
      id,
      caption: captionInput.value,
      location: locationInput.value,
      action: "EDIT",
    },
    refetchQueries: () => [{ query: VIEW_FEED }],
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const {
        data: { editPost },
      } = await editPostMutation();
      if (editPost) {
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
      <SlideContainer>
        <Swiper
          controlsProps={{
            PrevComponent: () => null,
            NextComponent: () => null,
            dotActiveStyle: {
              backgroundColor: colors.primary,
            },
          }}
        >
          {files.map((file) => (
            <Image
              key={file.id}
              style={{ width: wp("100%"), height: hp("50%") }}
              source={{ uri: file.url }}
            />
          ))}
        </Swiper>
      </SlideContainer>
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
          text={"修正"}
          accent={true}
          onPress={handleSubmit}
        />
      </Form>
    </View>
  );
};
