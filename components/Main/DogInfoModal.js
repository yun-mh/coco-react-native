import React from "react";
import { Text, View, Image } from "react-native";
import Modal from "react-native-modal";
import colors from "../../colors";
import TextButton from "./TextButton";
import { SafeAreaView } from "react-native-safe-area-context";

const DogInfoModal = ({
  image,
  dogName,
  breed,
  gender,
  birthdate,
  isDogInfoModalVisible,
  toggleDogInfoModal,
}) => {
  return (
    <Modal
      isVisible={isDogInfoModalVisible}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          padding: 10,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
        <View style={{ paddingLeft: 10, justifyContent: "space-around" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{dogName}</Text>
          <Text style={{ color: colors.darkGray }}>{gender}</Text>
          <Text style={{ color: colors.darkGray }}>{breed}</Text>
          <Text style={{ color: colors.darkGray }}>{birthdate}</Text>
        </View>
      </View>
      <SafeAreaView
        style={{
          paddingTop: 10,
          borderTopWidth: "0.5px",
          borderStyle: "solid",
          borderTopColor: colors.gray,
          backgroundColor: "white",
        }}
      >
        <TextButton
          title={"情報修正"}
          onPress={toggleDogInfoModal}
          color={colors.primary}
        />
        <TextButton
          title={"登録削除"}
          onPress={toggleDogInfoModal}
          color={colors.red}
        />
        <TextButton
          title={"キャンセル"}
          onPress={toggleDogInfoModal}
          color={colors.gray}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default DogInfoModal;
