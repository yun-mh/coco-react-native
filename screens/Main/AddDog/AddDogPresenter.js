import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, View, Keyboard } from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DismissKeyboard from "../../../components/DismissKeyboard";
import colors from "../../../colors";
import DateModal from "../../../components/DateModal";
import RadioButton from "../../../components/RadioButton";
import { useHeaderHeight } from "@react-navigation/stack";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 35px;
`;

const AvatarContainer = styled.TouchableOpacity`
  width: ${({ imageHeight }) => imageHeight}px;
  height: ${({ imageHeight }) => imageHeight}px;
  border-radius: 75px;
  background-color: ${colors.grayShadow};
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.Image`
  position: absolute;
  width: ${({ imageHeight }) => imageHeight}px;
  height: ${({ imageHeight }) => imageHeight}px;
  border-radius: 75px;
`;

const InputContainer = styled.View`
  margin-top: ${({ marginTop }) => marginTop}px;
`;

const DateInput = styled.TextInput`
  width: ${wp("100%") / 1.2}px;
  border: 0.5px solid ${colors.gray};
  background-color: white;
  border-radius: 30px;
  margin-bottom: 15px;
`;

export default ({
  loading,
  image,
  name,
  setName,
  breed,
  setBreed,
  radioProps,
  gender,
  setGender,
  birthdate,
  setBirthdate,
  handlePickImage,
  os,
  isDateModalVisible,
  setIsDateModalVisible,
  toggleSetDate,
  handleSubmit,
}) => {
  const headerHeight = useHeaderHeight();

  const [imageHeight, setImageHeight] = useState(150);
  const [marginTop, setMarginTop] = useState(40);

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

    return () => {
      Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
    };
  }, []);

  const _keyboardWillShow = () => {
    setImageHeight(75);
    setMarginTop(10);
  };

  const _keyboardWillHide = () => {
    setImageHeight(150);
    setMarginTop(40);
  };

  return (
    <Container>
      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={headerHeight}
        >
          <View
            style={{
              flex: 0.95,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AvatarContainer
              onPress={handlePickImage}
              imageHeight={imageHeight}
            >
              <Avatar source={{ uri: image }} imageHeight={imageHeight} />
              <Feather
                name="plus"
                size={40}
                color={colors.gray}
                style={{ marginTop: 5, marginLeft: 1 }}
              />
            </AvatarContainer>
            <InputContainer marginTop={marginTop}>
              <Input
                value={name}
                placeholder="犬名"
                autoCapitalize="none"
                stateFn={setName}
              />
              <Input
                value={breed}
                placeholder="犬種"
                autoCapitalize="none"
                stateFn={setBreed}
              />
              <RadioButton
                prop={radioProps}
                gender={gender}
                setGender={setGender}
              />
              <DateInput
                showSoftInputOnFocus={false}
                caretHidden={true}
                value={birthdate ? moment(birthdate).format("YYYY-MM-DD") : ""}
                placeholder="生年月日"
                onFocus={toggleSetDate}
                style={{
                  paddingVertical: hp("1%"),
                  paddingHorizontal: wp("5%"),
                }}
              />
            </InputContainer>
            <Button
              loading={loading}
              text={"登録"}
              accent={true}
              marginBottom={false}
              onPress={handleSubmit}
            />
          </View>
          <DateModal
            os={os}
            birthdate={birthdate}
            setBirthdate={setBirthdate}
            isDateModalVisible={isDateModalVisible}
            setIsDateModalVisible={setIsDateModalVisible}
            toggleSetDate={toggleSetDate}
          />
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </Container>
  );
};
