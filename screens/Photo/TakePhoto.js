import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Loader from "../../components/Main/Loader";
import colors from "../../colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const View = styled.View`
  flex: 1;
  justify-content: center;
`;

const ReverseButtonContainer = styled.View`
  align-items: flex-end;
  padding-top: 10px;
  padding-right: 10px;
`;

const ReverseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  border-radius: 16px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  padding-vertical: 20px;
`;

const Ring = styled.View`
  width: 98px;
  height: 98px;
  border-radius: 49px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${colors.secondary};
`;

export default ({ navigation }) => {
  const cameraRef = useRef();
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const takePhoto = async () => {
    if (!canTakePhoto) {
      return;
    }
    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        skipProcessing: true,
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      navigation.navigate("UploadPhoto", { photo: [asset] });
    } catch (error) {
      console.log(error);
      setCanTakePhoto(true);
    } finally {
      setCanTakePhoto(true);
    }
  };

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (error) {
      console.log(error);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <>
          <Camera
            ref={cameraRef}
            type={cameraType}
            style={{
              flex: 4,
              width: wp("100%"),
              height: wp("75%"),
              justifyContent: "space-between",
            }}
          >
            <ReverseButtonContainer>
              <ReverseButton onPress={toggleType}>
                <Feather name="refresh-ccw" size={20} color="white" />
              </ReverseButton>
            </ReverseButtonContainer>
          </Camera>
          <ButtonContainer>
            <Ring>
              <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
                <Button />
              </TouchableOpacity>
            </Ring>
          </ButtonContainer>
        </>
      ) : null}
    </View>
  );
};
