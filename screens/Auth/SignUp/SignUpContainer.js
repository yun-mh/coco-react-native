import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import SignUpPresenter from "./SignUpPresenter";
import { getCameraPermission } from "../../../userPermissions";
import { CREATE_ACCOUNT, CHECK_USER } from "../../../queries/Auth/AuthQueries";
import utils from "../../../utils";

export default ({ navigation }) => {
  const [avatar, setAvatar] = useState(
    "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous.jpg"
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      avatar,
      username,
      email,
      password,
    },
  });

  const handlePickAvatar = async () => {
    const status = await getCameraPermission();
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
    if (username === "" || email === "" || password === "") {
      Alert.alert("エラー", "すべての項目を入力してください。");
      return false;
    }
    if (!utils.isEmail(email)) {
      Alert.alert("エラー", "メールアドレスを正しく入力してください。");
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
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        navigation.reset({
          index: 0,
          routes: [{ name: "RegisterDog", params: { email } }],
        });
      } else {
        Alert.alert("エラー", "すでに登録されているメールアドレスです。");
      }
    } catch (e) {
      Alert.alert(e);
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpPresenter
      navigation={navigation}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      avatar={avatar}
      loading={loading}
      handleSubmit={handleSubmit}
      handlePickAvatar={handlePickAvatar}
    />
  );
};
