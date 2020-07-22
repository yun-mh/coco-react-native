import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import utils from "../../../utils";
import SignInPresenter from "./SignInPresenter";
import { LOGIN } from "../../../queries/Auth/AuthQueries";
import { useLogIn } from "../../../contexts/AuthContext";

export default ({ navigation, route: { params } }) => {
  const [email, setEmail] = useState(params?.email || "canivas@naver.com");
  const [password, setPassword] = useState(params?.password || "1188025");
  const [loading, setLoading] = useState(false);
  const login = useLogIn();
  const [loginMutation] = useMutation(LOGIN, {
    variables: {
      email,
      password,
    },
  });

  const toSignUp = () => navigation.navigate("SignUp");
  const toPasswordReset = () => navigation.navigate("PasswordReset");

  const isFormValid = () => {
    if (email === "" || password === "") {
      Alert.alert(
        "ログイン失敗",
        "メールアドレスとパスワードを入力してください。"
      );
      return false;
    }
    if (!utils.isEmail(email)) {
      Alert.alert("ログイン失敗", "メールアドレスを正しく入力してください。");
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
        data: { login: token },
      } = await loginMutation();
      if (token !== "" || token !== false) {
        login(token);
      } else {
        Alert.alert(
          "ログイン失敗",
          "認証トークンに問題があります。もう一度ログインしてみてください。"
        );
      }
    } catch (error) {
      Alert.alert(
        "ログイン失敗",
        "メールアドレスやパスワードを確認してください。"
      );
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignInPresenter
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      loading={loading}
      toSignUp={toSignUp}
      toPasswordReset={toPasswordReset}
      navigation={navigation}
    />
  );
};
