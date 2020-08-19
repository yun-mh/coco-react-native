import React, { useState } from "react";
import { Alert, Keyboard, Platform } from "react-native";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import RegisterDogPresenter from "./RegisterDogPresenter";
import { getCameraPermission } from "../../../userPermissions";
import { SET_DOG } from "../../../queries/Auth/AuthQueries";

export default ({ navigation, route: { params } }) => {
  const radioProps = [
    { key: "male", ios: "ios-male", md: "md-male", text: "男" },
    { key: "female", ios: "ios-female", md: "md-female", text: "女" },
  ];

  const [image, setImage] = useState(
    "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous-dog.jpg"
  );
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
      setImage(result.uri);
    }
  };

  const toggleSetDate = () => {
    Keyboard.dismiss();
    setIsDateModalVisible(!isDateModalVisible);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const {
        data: { setDog },
      } = await dogRegisterMutation();
      if (setDog) {
        Alert.alert("登録完了", "会員登録が完了しました。");
        navigation.reset({
          index: 0,
          routes: [{ name: "SignIn", params: { email } }],
        });
      }
    } catch (e) {
      Alert.alert(e);
      console.warn(e);
    } finally {
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
      handleSubmit={handleSubmit}
    />
  );
};
