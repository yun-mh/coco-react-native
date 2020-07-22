import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import colors from "../../colors";
import TextButton from "./TextButton";

const DogInfoModal = ({
  isDogInfoModalVisible,
  toggleDogInfoModal,
  logout,
}) => {
  return (
    <Modal
      isVisible={isDogInfoModalVisible}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={{ backgroundColor: "white" }}>
        <TextButton
          title={"キャンセル"}
          onPress={toggleDogInfoModal}
          color={colors.gray}
        />
      </View>
    </Modal>
  );
};

export default DogInfoModal;
