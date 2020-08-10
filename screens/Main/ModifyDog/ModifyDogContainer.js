import React, { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import { getCameraPermission } from "../../../userPermissions";
import { MODIFY_DOG, VIEW_USER } from "../../../queries/Main/MainQueries";
import ModifyDogPresenter from "./ModifyDogPresenter";

export default ({ navigation, route }) => {
  const radioProps = [
    { key: "male", ios: "ios-male", md: "md-male", text: "男" },
    { key: "female", ios: "ios-female", md: "md-female", text: "女" },
  ];

  const [image, setImage] = useState(
    route?.params?.image ||
      "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous-dog.jpg"
  );
  const [dogId, setDogId] = useState(route?.params?.dogId);
  const [name, setName] = useState(route?.params?.dogName);
  const [gender, setGender] = useState(route?.params?.gender);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [birthdate, setBirthdate] = useState(route?.params?.birthdate || "");
  const [breed, setBreed] = useState(route?.params?.breed);
  const [loading, setLoading] = useState(false);

  const [modifyDogMutation] = useMutation(MODIFY_DOG, {
    variables: {
      id: dogId,
      image,
      name,
      gender,
      birthdate,
      breed,
      action: "EDIT",
    },
    refetchQueries: () => [
      { query: VIEW_USER, variables: { id: route.params.id } },
    ],
  });

  const handlePickImage = async () => {
    const status = getCameraPermission();
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
    setIsDateModalVisible(!isDateModalVisible);
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const {
        data: { editDog },
      } = await modifyDogMutation();
      if (editDog) {
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
    <ModifyDogPresenter
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
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
      toggleSetDate={toggleSetDate}
      handleSubmit={handleSubmit}
    />
  );
};
