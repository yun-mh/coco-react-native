import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DismissKeyboard from "../../../components/DismissKeyboard";
import TextButton from "../../../components/Auth/TextButton";
import colors from "../../../colors";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 35px;
`;

const AvatarContainer = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: ${colors.grayShadow};
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.Image`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 75px;
`;

const InputContainer = styled.View`
  margin-top: 60px;
`;

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
  navigation,
  image,
  name,
  setName,
  breed,
  setBreed,
  gender,
  setGender,
  birthdate,
  setBirthdate,
  handleSubmit,
  handlePickImage,
}) => {
  const toSignIn = () => navigation.navigate("SignIn");
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
            <AvatarContainer onPress={handlePickImage}>
              <Avatar source={{ uri: image }} />
              <Feather
                name="plus"
                size={40}
                color={colors.gray}
                style={{ marginTop: 5, marginLeft: 1 }}
              />
            </AvatarContainer>
            <InputContainer>
              <Input
                value={name}
                placeholder="犬名"
                autoCapitalize="none"
                stateFn={setName}
              />
              <Input
                value={breed}
                placeholder="breed"
                autoCapitalize="none"
                stateFn={setBreed}
              />
              <Input value={gender} placeholder="gender" stateFn={setGender} />
              <Input
                value={birthdate}
                placeholder="birthdate"
                stateFn={setBirthdate}
              />
            </InputContainer>
            <Button text={"次へ"} accent={true} onPress={handleSubmit} />
          </View>
          <SignUpFooter>
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
