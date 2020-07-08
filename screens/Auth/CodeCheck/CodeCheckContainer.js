import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import CodeCheckPresenter from "./CodeCheckPresenter";
import { CODE_CHECK } from "../../../queries/Auth/AuthQueries";

export default ({ navigation, route: { params } }) => {
  const [code, setCode] = useState();
  const [email, setEmail] = useState(params?.email);
  const [loading, setLoading] = useState(false);
  const [codeCheckMutation] = useMutation(CODE_CHECK, {
    variables: {
      code,
      email,
    },
  });

  const isFormValid = () => {
    if (code === "") {
      Alert.alert("エラー", "コードを入力してください。");
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
        data: { codeCheck },
      } = await codeCheckMutation();
      if (codeCheck) {
        navigation.navigate("PasswordChange", { email });
      } else {
        Alert.alert("エラー", "コードをもう一度確認してください。");
      }
    } catch (error) {
      Alert.alert("エラー", "コードをもう一度確認してください。");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CodeCheckPresenter
      code={code}
      setCode={setCode}
      handleSubmit={handleSubmit}
      loading={loading}
      navigation={navigation}
    />
  );
};
