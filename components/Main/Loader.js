import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import colors from "../../colors/";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => (
  <Container>
    <ActivityIndicator color={colors.primary} />
  </Container>
);
