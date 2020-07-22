import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TextButton = styled.Text`
  color: ${({ color }) => color};
  font-size: 18px;
  font-weight: 500;
  padding-vertical: 10px;
`;

export default ({ title, onPress, color }) => (
  <TextContainer>
    <TouchableOpacity onPress={onPress}>
      <TextButton color={color}>{title}</TextButton>
    </TouchableOpacity>
  </TextContainer>
);
