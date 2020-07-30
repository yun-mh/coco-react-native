import React from "react";
import Modal from "react-native-modal";
import colors from "../../colors";
import TextButton from "./TextButton";
import { SafeAreaView } from "react-native-safe-area-context";

const UserInfoModal = ({
  isUserInfoModalVisible,
  toggleUserInfoModal,
  toProfileModify,
  logout,
}) => {
  return (
    <Modal
      isVisible={isUserInfoModalVisible}
      style={{ justifyContent: "flex-end", margin: 0 }}
      onBackdropPress={toggleUserInfoModal}
    >
      <SafeAreaView style={{ backgroundColor: "white", paddingTop: 10 }}>
        <TextButton
          title={"会員情報変更"}
          onPress={toProfileModify}
          color={colors.primary}
        />
        <TextButton title={"ログアウト"} onPress={logout} color={colors.red} />
        <TextButton
          title={"キャンセル"}
          onPress={toggleUserInfoModal}
          color={colors.gray}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default UserInfoModal;
