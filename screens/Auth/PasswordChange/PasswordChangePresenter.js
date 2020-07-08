import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import styled from "styled-components/native";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DismissKeyboard from "../../../components/DismissKeyboard";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 35px;
`;

const InputContainer = styled.View``;

export default ({
  password,
  setPassword,
  handleSubmit,
  loading,
  navigation,
}) => {
  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.95,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <InputContainer>
              <Input
                value={password}
                placeholder="新しいパスワード"
                autoCapitalize="none"
                isPassword={true}
                stateFn={setPassword}
              />
            </InputContainer>
            <Button
              loading={loading}
              text={"更新"}
              accent={true}
              onPress={handleSubmit}
            />
          </View>
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};
