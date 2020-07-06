import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import utils from "../../../utils";
import PasswordResetPresenter from "./PasswordResetPresenter";
import { PASSWORD_RESET } from "../../../queries/Auth/AuthQueries";

export default ({ navigation, route: { params } }) => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordResetMutation] = useMutation(PASSWORD_RESET, {
    variables: {
      email,
    },
  });

  const isFormValid = () => {
    if (email === "") {
      Alert.alert("エラー", "メールアドレスを入力してください。");
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
        data: { passwordReset },
      } = await passwordResetMutation();
      if (passwordReset) {
        Alert.alert(
          "完了",
          "メールを送信しました。メール箱を確認してください。"
        );
        navigation.navigate("CodeCheck", { email });
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
    <PasswordResetPresenter
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      loading={loading}
      navigation={navigation}
    />
  );
};
