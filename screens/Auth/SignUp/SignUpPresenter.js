import React from "react";
import { KeyboardAvoidingView, View, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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

const AvatarContainer = styled.TouchableOpacity`
  width: ${wp("30%")}px;
  height: ${wp("30%")}px;
  border-radius: 75px;
  background-color: ${colors.grayShadow};
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.Image`
  position: absolute;
  width: ${wp("30%")}px;
  height: ${wp("30%")}px;
  border-radius: 75px;
`;

const InputContainer = styled.View`
  margin-top: ${hp("3%")}px;
`;

const DividerContainer = styled.View`
  margin-vertical: ${hp("2%")}px;
  flex-direction: row;
  align-items: center;
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
  navigation,
  loading,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  avatar,
  handleSubmit,
  handlePickAvatar,
}) => {
  const toSignIn = () => navigation.navigate("SignIn");

  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <SafeAreaView
            style={{
              flex: 9,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AvatarContainer onPress={handlePickAvatar}>
              <Avatar source={{ uri: avatar }} />
              <Feather
                name="plus"
                size={40}
                color={colors.gray}
                style={{ marginTop: 5, marginLeft: 1 }}
              />
            </AvatarContainer>
            <InputContainer>
              <Input
                value={username}
                placeholder="ユーザ名"
                autoCapitalize="none"
                stateFn={setUsername}
              />
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
                autoCapitalize="none"
                stateFn={setPassword}
              />
            </InputContainer>
            <Button
              text={"次へ"}
              loading={loading}
              accent={true}
              onPress={handleSubmit}
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
          </SafeAreaView>
          <SignUpFooter style={{ flex: 1 }}>
            <TextButton
              caption={"アカウントをお持ちの場合は"}
              title={"ログイン"}
              onPress={toSignIn}
            />
          </SignUpFooter>
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};
