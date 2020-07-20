import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import colors from "../../colors";

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
`;

const DataContainer = styled.View`
  margin-left: 10px;
`;

const Username = styled.Text`
  color: ${colors.black};
  font-weight: bold;
`;

const BreedingInfo = styled.Text`
  color: ${colors.gray};
`;

export default ({ id, avatar, username }) => (
  <ItemContainer>
    <TouchableOpacity
      onPress={() => navigation.navigate("Profile", { id: user.id })}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: avatar }}
      />
    </TouchableOpacity>
    <DataContainer>
      <Username>{username}</Username>
      <BreedingInfo>を飼っています</BreedingInfo>
    </DataContainer>
  </ItemContainer>
);
