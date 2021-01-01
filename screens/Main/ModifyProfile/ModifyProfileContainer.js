import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import { getPermission } from "../../../userPermissions";
import ModifyProfilePresenter from "./ModifyProfilePresenter";
import { VIEW_USER, EDIT_USER } from "../../../queries/Main/MainQueries";
import { Alert } from "react-native";
import axios from "axios";
import utils from "../../../utils";

export default ({ navigation, route }) => {
  const [avatar, setAvatar] = useState(
    route.params.avatar ||
      "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous.jpg"
  );
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [username, setUsername] = useState(route.params.username || "");
  const [email, setEmail] = useState(route.params.email);
  const [loading, setLoading] = useState(false);

  const [editUserMutation] = useMutation(EDIT_USER, {
    variables: {
      username,
    },
    refetchQueries: () => [
      { query: VIEW_USER, variables: { id: route.params.id } },
    ],
  });

  const handlePickAvatar = async () => {
    const status = await getPermission("cameraRoll");

    if (status !== "granted") {
      Alert.alert("カメラロールの権限が必要です。");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      setChangeAvatar(true);
      setAvatar(result.uri);
    }
  };

  const isFormValid = () => {
    if (username === "") {
      Alert.alert("エラー", "すべての項目を入力してください。");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    setLoading(true);

    let location = "";
    if (changeAvatar) {
      const formData = new FormData();
      const [, type] = utils.splitExtension(avatar);
      formData.append("file", {
        name: `av-${new Date().getTime()}`,
        type: `image/${type.toLowerCase()}`,
        uri: avatar,
      });
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
      location = locations[0];
    }

    try {
      const {
        data: { editUser },
      } = await editUserMutation({
        variables: {
          avatar: location !== "" ? location : avatar,
          username,
        },
      });
      if (editUser) {
        await navigation.navigate("Profile", {
          id: route.params.id,
        });
      }
    } catch (e) {
      Alert.alert("エラー", e.message);
      console.warn(e);
    } finally {
      setChangeAvatar(false);
      setLoading(false);
    }
  };

  return (
    <ModifyProfilePresenter
      navigation={navigation}
      username={username}
      setUsername={setUsername}
      email={email}
      avatar={avatar}
      loading={loading}
      handleSubmit={handleSubmit}
      handlePickAvatar={handlePickAvatar}
    />
  );
};
