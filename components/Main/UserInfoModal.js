import React from "react";
import Modal from "react-native-modal";
import colors from "../../colors";
import TextButton from "./TextButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePersistor } from "../../contexts/PersistContext";
import { useApolloClient } from "@apollo/client";
import { View } from "react-native";

const UserInfoModal = ({
  isUserInfoModalVisible,
  toggleUserInfoModal,
  toProfileModify,
  logout,
}) => {
  const persistor = usePersistor();
  const client = useApolloClient();

  return (
    <Modal
      isVisible={isUserInfoModalVisible}
      style={{ justifyContent: "flex-end", margin: 0 }}
      onBackdropPress={toggleUserInfoModal}
    >
      <SafeAreaView style={{ backgroundColor: "white", paddingTop: 10 }}>
        <View style={{ paddingBottom: 10 }}>
          <TextButton
            title={"会員情報変更"}
            onPress={toProfileModify}
            color={colors.primary}
          />
          <TextButton
            title={"ログアウト"}
            onPress={async () => {
              await persistor.pause();
              await persistor.purge();
              await client.resetStore();
              logout();
            }}
            color={colors.red}
          />
          <TextButton
            title={"キャンセル"}
            onPress={toggleUserInfoModal}
            color={colors.gray}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default UserInfoModal;
