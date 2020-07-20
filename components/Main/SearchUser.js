import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";

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

export default ({ id, avatar, username }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Profile", { id })}>
      <ItemContainer>
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={{ uri: avatar }}
        />
        <DataContainer>
          <Username>{username}</Username>
          <BreedingInfo>を飼っています</BreedingInfo>
        </DataContainer>
      </ItemContainer>
    </TouchableOpacity>
  );
};
