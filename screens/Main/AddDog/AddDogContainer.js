import React, { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import AddDogPresenter from "./AddDogPresenter";
import { getPermission } from "../../../userPermissions";
import { ADD_DOG, VIEW_USER } from "../../../queries/Main/MainQueries";

export default ({ navigation, route }) => {
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
  const [os, setOs] = useState(Platform.OS);

  const [dogRegisterMutation] = useMutation(ADD_DOG, {
    variables: {
      image,
      name,
      breed,
      gender,
      birthdate,
    },
    refetchQueries: () => [
      { query: VIEW_USER, variables: { id: route.params.id } },
    ],
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
    if (name.length > 10) {
      Alert.alert("エラー", "犬名は10文字以内に設定してください。");
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
        data: { registerDog },
      } = await dogRegisterMutation();
      if (registerDog) {
        navigation.navigate("Profile", {
          id: route.params.id,
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
    <AddDogPresenter
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
