import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import colors from "../../colors";

const Btn = styled.View`
  border: 1px solid ${(props) => (props.accent ? "transparent" : colors.black)};
  border-radius: 5px;
  padding: 5px 5px;
  align-items: center;
  background-color: ${(props) =>
    props.accent ? colors.primary : "transparent"};
`;

const Text = styled.Text`
  font-weight: 600;
  color: ${(props) => (props.accent ? "white" : colors.black)};
`;

const Button = ({ loading, onPress, text, accent = false }) => (
  <TouchableOpacity onPress={loading ? null : onPress}>
    <Btn accent={accent}>
      {loading ? (
        <ActivityIndicator color={accent ? "white" : "black"} />
      ) : (
        <Text accent={accent}>{text}</Text>
      )}
    </Btn>
  </TouchableOpacity>
);

export default Button;
