import React from "react";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../colors";

const Container = styled.TextInput`
  width: ${wp("100%") / 1.2}px;
  border: 0.5px solid ${colors.gray};
  background-color: white;
  border-radius: 30px;
  margin-bottom: 15px;
`;

const Input = ({
  value,
  placeholder,
  isPassword = false,
  autoCapitalize,
  stateFn,
  keyboardType,
}) => (
  <Container
    style={{ paddingVertical: hp("1%"), paddingHorizontal: wp("5%") }}
    keyboardType={keyboardType}
    value={value}
    placeholder={placeholder}
    secureTextEntry={isPassword ? true : false}
    autoCapitalize={autoCapitalize}
    onChangeText={(text) => stateFn(text)}
  />
);

export default Input;
