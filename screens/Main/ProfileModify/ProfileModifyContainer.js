import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import * as ImagePicker from "expo-image-picker";
import { getCameraPermission } from "../../../userPermissions";
import ProfileModifyPresenter from "./ProfileModifyPresenter";
import { EDIT_USER, VIEW_USER } from "../../../queries/Main/MainQueries";

export default ({ navigation, route }) => {
  const [avatar, setAvatar] = useState(
    route.params.avatar ||
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.globalvetlink.com%2Fwp-content%2Fuploads%2F2015%2F07%2Fanonymous.png&f=1&nofb=1"
  ); // fix this later
  const [username, setUsername] = useState(route.params.username || "");
  const [email, setEmail] = useState(route.params.email);
  const [loading, setLoading] = useState(false);
  const [editUserMutation] = useMutation(EDIT_USER, {
    variables: {
      username,
      avatar,
    },
  });

  const handlePickAvatar = async () => {
    getCameraPermission();
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
        Alert.alert("完了", "会員情報を変更しました。");
        navigation.navigate("Profile", {
          id: route.params.id,
          isModified: true,
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
    <ProfileModifyPresenter
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
