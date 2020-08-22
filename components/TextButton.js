import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: ${colors.black};
  font-size: 14px;
`;

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const TextButton = styled.Text`
  margin-left: 5px;
  color: ${colors.primary};
  font-size: ${({ size }) => size}px;
  font-weight: ${({ weight }) => weight};
`;

export default ({
  caption,
  title,
  icon,
  weight = "bold",
  size = 16,
  onPress,
}) => (
  <TextContainer>
    <Text>{caption}</Text>
    <Touchable onPress={onPress}>
      {icon}
      <TextButton weight={weight} size={size}>
        {title}
      </TextButton>
    </Touchable>
  </TextContainer>
);
