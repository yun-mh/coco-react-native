import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import * as ImagePicker from "expo-image-picker";
import SignUpPresenter from "./SignUpPresenter";
import { getCameraPermission } from "../../../userPermissions";
import { CREATE_ACCOUNT } from "../../../queries/Auth/AuthQueries";
import utils from "../../../utils";

export default ({ navigation }) => {
  const [avatar, setAvatar] = useState(
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.globalvetlink.com%2Fwp-content%2Fuploads%2F2015%2F07%2Fanonymous.png&f=1&nofb=1"
  ); // fix this later
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
        navigation.navigate("RegisterDog", { email });
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
