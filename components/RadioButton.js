import React from "react";
import { View, TouchableOpacity, Platform, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../colors";

const { width } = Dimensions.get("screen");

const Container = styled.View`
  flex-direction: row;
  width: ${width / 1.2}px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.TouchableOpacity`
  width: ${wp("40%")}px;
  flex-direction: row;
  align-items: center;
  border-radius: 30px;
  justify-content: space-around;
  border: 0.5px solid ${colors.gray};
  padding-vertical: ${hp("1%")}px;
  padding-horizontal: ${wp("5%")}px;
  background-color: ${({ gender, item }) =>
    gender === item ? colors.secondary : colors.white};
`;

const Text = styled.Text`
  font-weight: ${({ gender, item }) => (gender === item ? "bold" : "normal")};
  color: ${({ gender, item }) =>
    gender === item ? colors.white : colors.darkGray};
`;

export default ({ prop, gender, setGender }) => (
  <Container>
    {prop.map((item) => {
      return (
        <ButtonContainer
          key={item.key}
          item={item.key}
          gender={gender}
          onPress={() => {
            setGender(item.key);
          }}
        >
          {Platform.OS === "ios" ? (
            <Ionicons
              name={item.ios}
              size={24}
              color={gender === item.key ? colors.white : colors.darkGray}
            />
          ) : (
            <Ionicons
              name={item.md}
              size={24}
              color={gender === item.key ? colors.white : colors.darkGray}
            />
          )}
          <Text item={item.key} gender={gender}>
            {item.text}
          </Text>
        </ButtonContainer>
      );
    })}
  </Container>
);
