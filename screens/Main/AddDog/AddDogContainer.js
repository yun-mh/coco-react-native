import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import AddDogPresenter from "./AddDogPresenter";
import { getCameraPermission } from "../../../userPermissions";
import { ADD_DOG, VIEW_USER } from "../../../queries/Main/MainQueries";

export default ({ navigation, route }) => {
  const [image, setImage] = useState(
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.globalvetlink.com%2Fwp-content%2Fuploads%2F2015%2F07%2Fanonymous.png&f=1&nofb=1"
  ); // fix this later
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [breed, setBreed] = useState("");
  const [loading, setLoading] = useState(false);

  const updateCache = (cache, { data }) => {
    const existingUser = cache.readQuery({
      query: VIEW_USER,
      variables: {
        id: route.params.id,
      },
    });
    const newUser = data.registerDog;
    existingUser.viewUser.dogs = newUser;
    cache.writeQuery({
      query: VIEW_USER,
      variables: {
        id: route.params.id,
      },
      data: { ...existingUser },
    });
  };

  const [dogRegisterMutation] = useMutation(ADD_DOG, {
    variables: {
      image,
      name,
      breed,
      gender,
      birthdate,
    },
    update: updateCache,
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

  const handleSubmit = async () => {
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
      gender={gender}
      setGender={setGender}
      birthdate={birthdate}
      setBirthdate={setBirthdate}
      loading={loading}
      handleSubmit={handleSubmit}
      handlePickImage={handlePickImage}
    />
  );
};
