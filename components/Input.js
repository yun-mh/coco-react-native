import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PropTypes from "prop-types";
import colors from "../colors";

const { width } = Dimensions.get("screen");

const Container = styled.TextInput`
  width: ${width / 1.2}px;
  border: 1px solid ${colors.gray};
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

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  stateFn: PropTypes.func.isRequired,
};

export default Input;
