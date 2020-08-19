import React, { useState } from "react";
import { Text, View, Image, SafeAreaView, Platform } from "react-native";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../colors";
import TextButton from "./Main/TextButton";

const DateModal = ({
  os,
  birthdate,
  setBirthdate,
  isDateModalVisible,
  setIsDateModalVisible,
  toggleSetDate,
}) => {
  const onClose = (date) => {
    if (date && os !== "ios") {
      setIsDateModalVisible(false);
      setBirthdate(date);
    } else {
      setIsDateModalVisible(false);
    }
  };

  return os === "android" && isDateModalVisible === true ? (
    <DateTimePicker
      value={birthdate ? new Date(birthdate) : new Date()}
      mode="date"
      display="default"
      locale="ja-JP"
      onChange={(e, birthdate) => {
        onClose(birthdate);
      }}
    />
  ) : os === "ios" && isDateModalVisible === true ? (
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
            setBirthdate(birthdate);
          }}
        />
        <TextButton
          title={"設定"}
          onPress={() => onClose(birthdate)}
          color={colors.primary}
        />
      </SafeAreaView>
    </Modal>
  ) : null;
};

export default DateModal;
