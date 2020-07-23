import React from "react";
import { TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PropTypes from "prop-types";
import colors from "../colors";

const { width } = Dimensions.get("screen");

const Btn = styled.View`
  width: ${width / 1.2}px;
  border: 1px solid ${(props) => (props.accent ? "transparent" : colors.black)};
  border-radius: 30px;
  padding: 12px 0px;
  align-items: center;
  background-color: ${(props) =>
    props.accent ? colors.primary : "transparent"};
  box-shadow: 0px 3px 6px
    ${(props) => (props.accent ? colors.primaryShadow : "")};
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => (props.accent ? "white" : colors.black)};
`;

const Button = ({ loading, onPress, text, accent = false }) => (
  <TouchableOpacity
    onPress={loading ? null : onPress}
    style={{ marginBottom: hp("3%") }}
  >
    <Btn accent={accent}>
      {loading ? (
        <ActivityIndicator color={accent ? "white" : "black"} />
      ) : (
        <Text accent={accent}>{text}</Text>
      )}
    </Btn>
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  accent: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
