import React, { useState } from "react";
import { Alert, Keyboard, Platform } from "react-native";
import axios from "axios";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import RegisterDogPresenter from "./RegisterDogPresenter";
import { getPermission } from "../../../userPermissions";
import { SET_DOG } from "../../../queries/Auth/AuthQueries";
import utils from "../../../utils";

export default ({ navigation, route: { params } }) => {
  const radioProps = [
    { key: "male", ios: "ios-male", md: "md-male", text: "男" },
    { key: "female", ios: "ios-female", md: "md-female", text: "女" },
  ];

  const [image, setImage] = useState(
    "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous-dog.jpg"
  );
  const [changeImage, setChangeImage] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [birthdate, setBirthdate] = useState("");
  const [breed, setBreed] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(params?.email);
  const [os, setOs] = useState(Platform.OS);

  const [dogRegisterMutation] = useMutation(SET_DOG, {
    variables: {
      image,
      name,
      breed,
      gender,
      birthdate,
      email,
    },
  });

  const handlePickImage = async () => {
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
      setImage(result.uri);
      setChangeImage(true);
    }
  };

  const toggleSetDate = () => {
    Keyboard.dismiss();
    setIsDateModalVisible(!isDateModalVisible);
  };

  const isFormValid = () => {
    if (name === "" || birthdate == "" || breed == "") {
      Alert.alert("エラー", "すべての情報を入力してください。");
      return false;
    }
    return true;
  };

  const handleToLogin = () => {
    Alert.alert("登録完了", "会員登録が完了しました。");
    navigation.reset({
      index: 0,
      routes: [{ name: "SignIn", params: { email } }],
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    setLoading(true);

    let location = "";
    if (changeImage) {
      const formData = new FormData();
      const [, type] = utils.splitExtension(image);
      formData.append("file", {
        name: `av-${new Date().getTime()}`,
        type: `image/${type.toLowerCase()}`,
        uri: image,
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
        data: { setDog },
      } = await dogRegisterMutation({
        variables: {
          image: location !== "" ? location : image,
          name,
          breed,
          gender,
          birthdate,
          email,
        },
      });
      if (setDog) {
        handleToLogin();
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setChangeImage(false);
      setLoading(false);
    }
  };

  return (
    <RegisterDogPresenter
      navigation={navigation}
      image={image}
      name={name}
      setName={setName}
      breed={breed}
      setBreed={setBreed}
      radioProps={radioProps}
      gender={gender}
      setGender={setGender}
      birthdate={birthdate}
      setBirthdate={setBirthdate}
      loading={loading}
      handlePickImage={handlePickImage}
      os={os}
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
      toggleSetDate={toggleSetDate}
      handleToLogin={handleToLogin}
      handleSubmit={handleSubmit}
    />
  );
};
