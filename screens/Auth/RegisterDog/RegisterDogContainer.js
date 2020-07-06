import React, { useState } from "react";
import { Alert } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import * as ImagePicker from "expo-image-picker";
import RegisterDogPresenter from "./RegisterDogPresenter";
import { getCameraPermission } from "../../../userPermissions";
import { SET_DOG } from "../../../queries/Auth/AuthQueries";
import utils from "../../../utils";

export default ({ navigation, route: { params } }) => {
  const [image, setImage] = useState(
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.globalvetlink.com%2Fwp-content%2Fuploads%2F2015%2F07%2Fanonymous.png&f=1&nofb=1"
  ); // fix this later
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [breed, setBreed] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(params?.email);
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
    getCameraPermission();
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
        data: { setDog },
      } = await dogRegisterMutation();
      if (setDog) {
        Alert.alert("登録完了", "会員登録が完了しました。");
        navigation.navigate("SignIn", { email });
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
