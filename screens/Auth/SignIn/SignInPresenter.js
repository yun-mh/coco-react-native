import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import styled from "styled-components/native";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DismissKeyboard from "../../../components/DismissKeyboard";
import TextButton from "../../../components/TextButton";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 35px;
`;

const InputContainer = styled.View``;

const SignUpFooter = styled.View``;

export default ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
  toSignUp,
  toPasswordReset,
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
                value={email}
                placeholder="メールアドレス"
                autoCapitalize="none"
                keyboardType={"email-address"}
                stateFn={setEmail}
              />
              <Input
                value={password}
                placeholder="パスワード"
                isPassword={true}
                stateFn={setPassword}
              />
            </InputContainer>
            <Button
              loading={loading}
              text={"ログイン"}
              accent={true}
              onPress={handleSubmit}
            />
            <TextButton
              caption={"パスワードを忘れた場合は"}
              title={"パスワード再設定"}
              onPress={toPasswordReset}
            />
          </View>
          <SignUpFooter>
            <TextButton
              caption={"アカウントのお持ちでない場合は"}
              title={"会員登録"}
              onPress={toSignUp}
            />
          </SignUpFooter>
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
}; // delete text button later
