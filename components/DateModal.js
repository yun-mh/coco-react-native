import React, { useState } from "react";
import { Text, View, Image, SafeAreaView, Platform } from "react-native";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../colors";
import TextButton from "./Main/TextButton";

const DateModal = ({
  birthdate,
  setBirthdate,
  isDateModalVisible,
  setIsDateModalVisible,
  toggleSetDate,
}) => {
  return (
    <Modal
      isVisible={isDateModalVisible}
      style={{ justifyContent: "flex-end", margin: 0 }}
      onBackdropPress={toggleSetDate}
    >
      <SafeAreaView style={{ backgroundColor: "white", paddingTop: 10 }}>
        <DateTimePicker
          value={birthdate ? new Date(birthdate) : new Date()}
          mode="date"
          display="default"
          locale="ja-JP"
          onChange={(e, birthdate) => {
            if (Platform.OS === "ios") {
              setBirthdate(birthdate);
            }
          }}
        />
        {Platform.OS === "ios" && (
          <TextButton
            title={"設定"}
            onPress={() => toggleSetDate()}
            color={colors.primary}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default DateModal;
