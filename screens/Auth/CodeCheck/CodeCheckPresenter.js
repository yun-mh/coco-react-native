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

export default ({ code, setCode, handleSubmit, loading }) => {
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
                value={code}
                placeholder="コード"
                autoCapitalize="none"
                stateFn={setCode}
              />
            </InputContainer>
            <Button
              loading={loading}
              text={"チェック"}
              accent={true}
              onPress={handleSubmit}
            />
          </View>
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};
