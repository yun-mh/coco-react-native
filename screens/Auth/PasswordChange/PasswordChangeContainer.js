import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/client";
import PasswordChangePresenter from "./PasswordChangePresenter";
import { PASSWORD_CHANGE } from "../../../queries/Auth/AuthQueries";

export default ({ navigation, route: { params } }) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState(params?.email);
  const [loading, setLoading] = useState(false);
  const [passwordChangeMutation] = useMutation(PASSWORD_CHANGE, {
    variables: {
      email,
      password,
    },
  });

  const isFormValid = () => {
    if (password === "") {
      Alert.alert("エラー", "設定するパスワードを入力してください。");
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
        data: { passwordChange },
      } = await passwordChangeMutation();
      if (passwordChange) {
        Alert.alert("完了", "パスワードの変更が完了しました。");
        navigation.navigate("SignIn");
      } else {
        Alert.alert("エラー", "もう一度申し込んでください。");
      }
    } catch (error) {
      Alert.alert(error);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PasswordChangePresenter
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      loading={loading}
      navigation={navigation}
    />
  );
};
