import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import utils from "../../../utils";
import PasswordChangePresenter from "./PasswordChangePresenter";

export default ({ navigation, route: { params } }) => {
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordResetMutation] = useMutation(PASSWORD_RESET, {
    variables: {
      password,
    },
  });

  const isFormValid = () => {
    if (password === "") {
      Alert.alert("エラー", "メールアドレスを入力してください。");
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
        data: { passwordReset },
      } = await passwordResetMutation();
      if (passwordReset) {
        Alert.alert(
          "完了",
          "メールを送信しました。メール箱を確認してください。"
        );
      } else {
        Alert.alert("エラー", "もう一度申し込んでください。");
      }
    } catch (error) {
      Alert.alert("エラー", "メールアドレスを確認してください。");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PasswordChangePresenter
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      loading={loading}
      navigation={navigation}
    />
  );
};
