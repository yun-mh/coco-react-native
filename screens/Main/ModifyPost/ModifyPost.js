import React, { useState } from "react";
import { Image, Alert, KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from "react-native-web-swiper";
import { useMutation } from "@apollo/client";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Feather } from "@expo/vector-icons";
import { VIEW_FEED, EDIT_POST } from "../../../queries/Main/MainQueries";
import colors from "../../../colors";
import Button from "../../../components/Button";
import TextButton from "../../../components/TextButton";
import ENV from "../../../components/env";
import { useHeaderHeight } from "@react-navigation/stack";
import DismissKeyboard from "../../../components/DismissKeyboard";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  flex-direction: row;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray};
`;

const Form = styled.View`
  flex: 7;
  justify-content: center;
  align-items: center;
`;

const LocationBtnContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${wp("83%")}px;
  border-color: ${colors.gray};
  border-bottom-width: 1px;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

export default ({ navigation, route }) => {
  const headerHeight = useHeaderHeight();

  const [loading, setIsLoading] = useState(false);
  const id = route.params.id;
  const [files, setFiles] = useState(route.params.files);
  const [location, setLocation] = useState(route.params.location);
  const [caption, setCaption] = useState(route.params.caption);

  const [editPostMutation] = useMutation(EDIT_POST, {
    variables: {
      id,
      caption,
      location,
      action: "EDIT",
    },
    refetchQueries: () => [{ query: VIEW_FEED }],
  });

  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      return false;
    }
    return true;
  };

  const handleGetLocation = async () => {
    const hasPermission = await askPermission();
    if (!hasPermission) {
      return;
    }

    try {
      //   setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${ENV.googleApiKey}&language=ja`
      );
      const resData = await res.json();
      const address = resData.results[0].formatted_address.split(" ")[1];
      setLocation(address);
    } catch (e) {
      console.warn(e);
    } finally {
    }
    // setIsFetching(false);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const {
        data: { editPost },
      } = await editPostMutation();
      if (editPost) {
        navigation.navigate("Feed");
      }
    } catch (error) {
      Alert.alert("エラー", "もう一度アップロードしてください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={headerHeight + 10}
    >
      <Container>
        <ScrollContainer
          horizontal={true}
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
          {files.map((photo) => (
            <Image
              key={photo.id}
              source={{ uri: photo.url }}
              style={{ height: 80, width: 80, marginRight: 10 }}
            />
          ))}
        </ScrollContainer>

        <DismissKeyboard>
          <Form>
            <TextInput
              value={location}
              onChangeText={(text) => setLocation(text)}
              placeholder="位置"
              multiline={true}
            />
            <LocationBtnContainer>
              <TextButton
                icon={
                  <Feather name="map-pin" size={14} color={colors.primary} />
                }
                title={"現在の位置を取得する"}
                weight="normal"
                size={14}
                onPress={handleGetLocation}
              />
            </LocationBtnContainer>
            <TextInput
              value={caption}
              onChangeText={(text) => setCaption(text)}
              placeholder="本文"
              multiline={true}
            />
            <Button
              loading={loading}
              text={"修正"}
              accent={true}
              onPress={handleSubmit}
            />
          </Form>
        </DismissKeyboard>
      </Container>
    </KeyboardAvoidingView>
  );
};
