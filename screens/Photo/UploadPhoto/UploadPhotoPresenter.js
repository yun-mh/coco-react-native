import React from "react";
import { Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components";
import colors from "../../../colors";
import Button from "../../../components/Button";
import TextButton from "../../../components/TextButton";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  flex-direction: row;
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
  width: ${wp("100%") / 1.2}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray};
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

export default ({
  photo,
  loading,
  location,
  setLocation,
  caption,
  setCaption,
  handleGetLocation,
  handleSubmit,
}) => {
  return (
    <Container>
      <ScrollContainer
        horizontal={true}
        contentContainerStyle={{ alignItems: "center", paddingHorizontal: 10 }}
      >
        {photo.map((photo) => (
          <Image
            key={photo.id}
            source={{ uri: photo.uri }}
            style={{ height: 80, width: 80, marginRight: 10 }}
          />
        ))}
      </ScrollContainer>
      <Form>
        <TextInput
          value={location}
          onChangeText={(text) => setLocation(text)}
          placeholder="位置"
          multiline={true}
        />
        <LocationBtnContainer>
          <TextButton
            icon={<Feather name="map-pin" size={14} color={colors.primary} />}
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
          text={"投稿"}
          accent={true}
          onPress={handleSubmit}
        />
      </Form>
    </Container>
  );
};
