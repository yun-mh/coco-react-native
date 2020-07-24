import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DismissKeyboard from "../../../components/DismissKeyboard";
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

const Email = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.black};
  margin-top: 15px;
`;

const InputContainer = styled.View`
  margin-top: 30px;
`;

export default ({
  loading,
  username,
  setUsername,
  email,
  avatar,
  handleSubmit,
  handlePickAvatar,
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
            <AvatarContainer onPress={handlePickAvatar}>
              <Avatar source={{ uri: avatar }} />
              <Feather
                name="plus"
                size={40}
                color={colors.gray}
                style={{ marginTop: 5, marginLeft: 1 }}
              />
            </AvatarContainer>
            <Email>{email}</Email>
            <InputContainer>
              <Input
                value={username}
                placeholder="ユーザ名"
                autoCapitalize="none"
                stateFn={setUsername}
              />
            </InputContainer>
            <Button
              loading={loading}
              text={"修正"}
              accent={true}
              onPress={handleSubmit}
            />
          </View>
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};
