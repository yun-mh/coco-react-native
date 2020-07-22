import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import colors from "../../colors";
import TextButton from "./TextButton";

const UserInfoModal = ({
  isUserInfoModalVisible,
  toggleUserInfoModal,
  logout,
}) => {
  return (
    <Modal
      isVisible={isUserInfoModalVisible}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={{ backgroundColor: "white" }}>
        <TextButton
          title={"会員情報変更"}
          onPress={toggleUserInfoModal}
          color={colors.primary}
        />
        <TextButton title={"ログアウト"} onPress={logout} color={colors.red} />
        <TextButton
          title={"キャンセル"}
          onPress={toggleUserInfoModal}
          color={colors.gray}
        />
      </View>
    </Modal>
  );
};

export default UserInfoModal;
