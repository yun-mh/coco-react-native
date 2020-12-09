import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../colors";

const Btn = styled.View`
  width: ${wp("100%") / 1.2}px;
  border: 1px solid ${(props) => (props.accent ? "transparent" : colors.black)};
  border-radius: 30px;
  padding: 12px 0px;
  align-items: center;
  background-color: ${(props) =>
    props.accent && props.danger
      ? colors.red
      : props.accent && !props.danger
      ? colors.primary
      : "transparent"};
  box-shadow: ${(props) =>
    props.accent && props.danger
      ? `0px 3px 6px ${colors.redShadow}`
      : props.accent && !props.danger
      ? `0px 3px 6px ${colors.primaryShadow}`
      : "none"};
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => (props.accent ? "white" : colors.black)};
`;

const Button = ({
  loading,
  onPress,
  text,
  accent = false,
  danger = false,
  marginBottom = true,
}) => (
  <TouchableOpacity
    onPress={loading ? null : onPress}
    style={{ marginBottom: marginBottom ? hp("3%") : 0 }}
  >
    <Btn accent={accent} danger={danger}>
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
