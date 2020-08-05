import React from "react";
import styled from "styled-components";
import { useRoute, useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default () => {
  const route = useRoute();
  const navigation = useNavigation();
  const counterpart = route.params.username;

  navigation.setOptions({ title: counterpart });

  return (
    <Container>
      <Text>Message</Text>
    </Container>
  );
};
