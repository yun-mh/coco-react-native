import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import * as ImagePicker from "expo-image-picker";
import { getCameraPermission } from "../../../userPermissions";
import { MODIFY_DOG, VIEW_USER } from "../../../queries/Main/MainQueries";
import ModifyDogPresenter from "./ModifyDogPresenter";

export default ({ navigation, route }) => {
  const [image, setImage] = useState(
    route?.params?.image ||
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.globalvetlink.com%2Fwp-content%2Fuploads%2F2015%2F07%2Fanonymous.png&f=1&nofb=1"
  ); // fix this later
  const [dogId, setDogId] = useState(route?.params?.dogId);
  const [name, setName] = useState(route?.params?.dogName);
  const [gender, setGender] = useState(route?.params?.gender);
  const [birthdate, setBirthdate] = useState(route?.params?.birthdate);
  const [breed, setBreed] = useState(route?.params?.breed);
  const [loading, setLoading] = useState(false);

  const updateCache = (cache, { data }) => {
    const existingUser = cache.readQuery({
      query: VIEW_USER,
      variables: {
        id: route.params.id,
      },
    });
    const newUser = data.editDog;
    existingUser.viewUser.dogs = newUser;
    cache.writeQuery({
      query: VIEW_USER,
      variables: {
        id: route.params.id,
      },
      data: { ...existingUser },
    });
  };

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
