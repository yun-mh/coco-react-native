import React, { useState } from "react";
import { Alert, Linking } from "react-native";
import { useMutation } from "@apollo/client";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { VIEW_USER, TOGGLE_STATUS } from "../../../queries/Main/MainQueries";
import SetLostPresenter from "./SetLostPresenter";

export default ({ navigation, route }) => {
  const [id, setId] = useState(route?.params?.id);
  const [dogId, setDogId] = useState(route?.params?.dogId);
  const [dogName, setDogName] = useState(route?.params?.dogName);
  const [image, setImage] = useState(route?.params?.image);
  const [breed, setBreed] = useState(route?.params?.breed);
  const [gender, setGender] = useState(route?.params?.gender);
  const [birthdate, setBirthdate] = useState(route?.params?.birthdate);
  const [isMissed, setIsMissed] = useState(route?.params?.isMissed);
  const [svg, setSvg] = useState();

  const [modifyDogMutation] = useMutation(TOGGLE_STATUS, {
    variables: {
      id: dogId,
      isMissed,
    },
    refetchQueries: () => [
      { query: VIEW_USER, variables: { id: currentUser } },
    ],
  });

  const toggleMissingStatus = () => {
    Alert.alert(
      "警告",
      "本当に迷子状態を変更しますか？",
      [
        {
          text: "キャンセル",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        { 
          text: "設定", 
          onPress: async () => {
            try {
              await modifyDogMutation();

            } catch(e) {
              console.log(e);
            }
          }
        }
      ]
    );
    // setIsMissed(!isMissed);
    // const { data: { toggleMissingStatus } } = await modifyDogMutation({ 
    //   variables: {
    //     id: dogId,
    //     isMissed: !isMissed,
    //   } 
    // });
    // if (toggleMissingStatus) {
    //   setIsMissed(!isMissed);
    // }
  };

  const openPage = () => {
    Linking.openURL(`https://support.cocofordogs.com/${dogId}?owner=${id}`);
  };

  const saveCode = () => {
    try {
      svg.toDataURL(async (data) => {
          const filename = FileSystem.documentDirectory + `coco_${new Date().getTime().toString()}.png`;
          await FileSystem.writeAsStringAsync(filename, data, {
              encoding: FileSystem.EncodingType.Base64,
          });
          await MediaLibrary.saveToLibraryAsync(filename);
          Alert.alert("完了", "QRコードを保存しました。");
      });
    } catch (e) {
      Alert.alert("エラー", "QRコード保存に失敗しました。")
    }
  };

  return (
    <SetLostPresenter
      dogId={dogId}
      dogName={dogName}
      image={image}
      breed={breed}
      gender={gender}
      birthdate={birthdate}
      isMissed={isMissed}
      setSvg={setSvg}
      openPage={openPage}
      saveCode={saveCode}
      toggleMissingStatus={toggleMissingStatus}
    />
  );
};
