import React, { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import utils from "../../../utils";
import { userLogin } from "../../../redux/usersSlice";
import SignInPresenter from "./SignInPresenter";

export default ({ navigation, route: { params } }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(params?.email);
  const [password, setPassword] = useState(params?.password);
  const isFormValid = () => {
    if (email === "" || password === "") {
      Alert.alert("認証失敗", "メールアドレスとパスワードを入力してください。");
      return false;
    }
    if (!utils.isEmail(email)) {
      Alert.alert("認証失敗", "メールアドレスを正しく入力してください。");
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (!isFormValid()) {
      return;
    }
    dispatch(
      userLogin({
        username: email,
        password,
      })
    );
  };
  return (
    <SignInPresenter
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      navigation={navigation}
    />
  );
};
