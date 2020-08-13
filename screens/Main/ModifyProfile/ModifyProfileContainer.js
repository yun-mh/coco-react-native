import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import { getCameraPermission } from "../../../userPermissions";
import ModifyProfilePresenter from "./ModifyProfilePresenter";
import { VIEW_USER, EDIT_USER } from "../../../queries/Main/MainQueries";
import { Alert } from "react-native";

export default ({ navigation, route }) => {
  const [avatar, setAvatar] = useState(
    route.params.avatar ||
      "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous.jpg"
  );
  const [username, setUsername] = useState(route.params.username || "");
  const [email, setEmail] = useState(route.params.email);
  const [loading, setLoading] = useState(false);

  const [editUserMutation] = useMutation(EDIT_USER, {
    variables: {
      username,
      avatar,
    },
    refetchQueries: () => [
      { query: VIEW_USER, variables: { id: route.params.id } },
    ],
  });

  const handlePickAvatar = async () => {
    const status = getCameraPermission();
    if (status != "granted") {
      Alert.alert("カメラロールの権限が必要です。");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
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
    try {
      const {
        data: { editUser },
      } = await editUserMutation();
      if (editUser) {
        await navigation.navigate("Profile", {
          id: route.params.id,
        });
      }
    } catch (e) {
      Alert.alert(e);
      console.warn(e);
    } finally {
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
