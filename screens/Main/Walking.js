import React from "react";
import styled from "styled-components";
import { Button } from "react-native";
import { useLogOut } from "../../contexts/AuthContext";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default () => {
  const logout = useLogOut();
  return (
    <Container>
      <Text>Walking</Text>
      <Button title={"logout"} onPress={logout}></Button>
    </Container>
  );
};
