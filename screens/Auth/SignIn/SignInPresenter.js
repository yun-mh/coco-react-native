import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import styled from "styled-components/native";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DismissKeyboard from "../../../components/DismissKeyboard";
import TextButton from "../../../components/TextButton";
import colors from "../../../colors";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 35px;
`;

const InputContainer = styled.View``;

const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 40px 0;
`;

const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${colors.gray};
`;

const DividerText = styled.Text`
  width: 50px;
  text-align: center;
  color: ${colors.gray};
`;

const SocialLoginContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

const SocialLoginButton = styled.View`
  width: 100px;
  margin-bottom: 25px;
  border: 1px solid ${colors.gray};
  border-radius: 30px;
  padding: 12px 0px;
  align-items: center;
  background-color: white;
  box-shadow: 0px 3px 6px ${colors.grayShadow};
`;

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
            <DividerContainer>
              <DividerLine />
              <DividerText>または</DividerText>
              <DividerLine />
            </DividerContainer>
            <SocialLoginContainer>
              <SocialLoginButton></SocialLoginButton>
              <SocialLoginButton></SocialLoginButton>
            </SocialLoginContainer>
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
