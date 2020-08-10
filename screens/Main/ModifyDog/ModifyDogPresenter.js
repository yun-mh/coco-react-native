import React from "react";
import { KeyboardAvoidingView, View, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DismissKeyboard from "../../../components/DismissKeyboard";
import colors from "../../../colors";
import DateModal from "../../../components/DateModal";
import RadioButton from "../../../components/RadioButton";

const { width } = Dimensions.get("screen");

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

const DateInput = styled.TextInput`
  width: ${width / 1.2}px;
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
  isDateModalVisible,
  setIsDateModalVisible,
  toggleSetDate,
  handleSubmit,
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
              text={"修正"}
              accent={true}
              onPress={handleSubmit}
            />
          </View>
        </KeyboardAvoidingView>
        <DateModal
          birthdate={birthdate}
          setBirthdate={setBirthdate}
          isDateModalVisible={isDateModalVisible}
          setIsDateModalVisible={setIsDateModalVisible}
          toggleSetDate={toggleSetDate}
        />
      </Container>
    </DismissKeyboard>
  );
};
