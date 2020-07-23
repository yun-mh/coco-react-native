import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DismissKeyboard from "../../../components/DismissKeyboard";
import TextButton from "../../../components/Auth/TextButton";
import colors from "../../../colors";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 35px;
`;

const AvatarContainer = styled.TouchableOpacity`
  border-radius: 75px;
  background-color: ${colors.grayShadow};
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.Image`
  position: absolute;
  border-radius: 75px;
`;

const InputContainer = styled.View``;

const DividerContainer = styled.View`
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
            <AvatarContainer
              style={{ width: wp("30%"), height: wp("30%") }}
              onPress={handlePickAvatar}
            >
              <Avatar
                style={{ width: wp("30%"), height: wp("30%") }}
                source={{ uri: avatar }}
              />
              <Feather
                name="plus"
                size={40}
                color={colors.gray}
                style={{ marginTop: 5, marginLeft: 1 }}
              />
            </AvatarContainer>
            <InputContainer style={{ marginTop: hp("3%") }}>
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
            <Button text={"次へ"} accent={true} onPress={handleSubmit} />
            <DividerContainer style={{ marginVertical: hp("2%") }}>
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
