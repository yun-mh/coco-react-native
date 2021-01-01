import React, { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import SignUpPresenter from "./SignUpPresenter";
import { getPermission } from "../../../userPermissions";
import { CREATE_ACCOUNT } from "../../../queries/Auth/AuthQueries";
import utils from "../../../utils";

export default ({ navigation }) => {
  const [avatar, setAvatar] = useState(
    "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous.jpg"
  );
  const [changeAvatar, setChangeAvatar] = useState(false);
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
    const status = await getPermission("cameraRoll");
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
      setChangeAvatar(true);
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

    let location = "";
    if (changeAvatar) {
      const formData = new FormData();
      const [, type] = utils.splitExtension(avatar);
      formData.append("file", {
        name: `av-${new Date().getTime()}`,
        type: `image/${type.toLowerCase()}`,
        uri: avatar,
      });
      const {
        data: { locations },
      } = await axios.post(
        "https://api-coco.herokuapp.com/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      location = locations[0];
    }

    try {
      const {
        data: { createAccount },
      } = await createAccountMutation({
        variables: {
          avatar: location !== "" ? location : avatar,
          username,
          email,
          password,
        },
      });
      if (createAccount) {
        navigation.reset({
          index: 0,
          routes: [{ name: "RegisterDog", params: { email } }],
        });
      }
    } catch (e) {
      Alert.alert("エラー", e.message);
      console.warn(e);
    } finally {
      setChangeAvatar(false);
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
