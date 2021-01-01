import React, { useState } from "react";
import { Alert, Keyboard } from "react-native";
import axios from "axios";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import { getPermission } from "../../../userPermissions";
import { MODIFY_DOG, VIEW_USER } from "../../../queries/Main/MainQueries";
import ModifyDogPresenter from "./ModifyDogPresenter";
import utils from "../../../utils";

export default ({ navigation, route }) => {
  const radioProps = [
    { key: "male", ios: "ios-male", md: "md-male", text: "男" },
    { key: "female", ios: "ios-female", md: "md-female", text: "女" },
  ];

  const [image, setImage] = useState(
    route?.params?.image ||
      "https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/anonymous-dog.jpg"
  );
  const [changeImage, setChangeImage] = useState(false);
  const [dogId, setDogId] = useState(route?.params?.dogId);
  const [name, setName] = useState(route?.params?.dogName);
  const [gender, setGender] = useState(route?.params?.gender);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [birthdate, setBirthdate] = useState(route?.params?.birthdate || "");
  const [breed, setBreed] = useState(route?.params?.breed);
  const [loading, setLoading] = useState(false);
  const [os, setOs] = useState(Platform.OS);

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
    const status = await getPermission("cameraRoll");
    if (status !== "granted") {
      Alert.alert("カメラロールの権限が必要です。");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
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
        data: { editDog },
      } = await modifyDogMutation({
        variables: {
          id: dogId,
          image: location !== "" ? location : image,
          name,
          breed,
          gender,
          birthdate,
          action: "EDIT",
        },
      });
      if (editDog) {
        navigation.navigate("Profile", {
          id: route.params.id,
        });
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setChangeImage(false);
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
      os={os}
      handlePickImage={handlePickImage}
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
      toggleSetDate={toggleSetDate}
      handleSubmit={handleSubmit}
    />
  );
};
