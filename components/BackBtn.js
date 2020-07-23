import React from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import utils from "../utils";

const Container = styled.View``;

export default () => (
  <Container style={{ marginLeft: utils.isAndroid() ? 0 : 14 }}>
    <Feather name={"chevron-down"} size={28} />
  </Container>
);
