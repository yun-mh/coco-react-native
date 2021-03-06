import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import Modal from "react-native-modal";
import moment from "moment";
import colors from "../../colors";
import TextButton from "./TextButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { VIEW_USER, DELETE_DOG } from "../../queries/Main/MainQueries";
import { useMutation } from "@apollo/client";
import { useRoute } from "@react-navigation/native";

const DogInfoModal = ({
  dogId,
  image,
  dogName,
  breed,
  gender,
  birthdate,
  toModifyDog,
  toSetLost,
  isDogInfoModalVisible,
  setDogInfoModalVisible,
  toggleDogInfoModal,
}) => {
  const route = useRoute();
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const [deleteDogMutation] = useMutation(DELETE_DOG, {
    variables: {
      id: dogId,
      action: "DELETE",
    },
    refetchQueries: () => [
      { query: VIEW_USER, variables: { id: route.params.id } },
    ],
  });

  const deleteDog = async (dogId) => {
    try {
      const { data: editDog } = await deleteDogMutation();
      if (editDog) {
        await setDogInfoModalVisible(false);
        await setIsDeleteMode(false);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const toggleDeleteAlert = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  const closeDogInfoModal = () => {
    setIsDeleteMode(false);
    toggleDogInfoModal();
  };

  return (
    <Modal
      isVisible={isDogInfoModalVisible}
      style={{ justifyContent: "flex-end", margin: 0 }}
      onBackdropPress={closeDogInfoModal}
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
          <Text style={{ color: colors.darkGray }}>{breed}</Text>
          <Text style={{ color: colors.darkGray }}>
            {gender === "male" ? "男" : "女"}
          </Text>
          <Text style={{ color: colors.darkGray }}>
            {moment(birthdate).format("YYYY-MM-DD")}
          </Text>
        </View>
      </View>
      <SafeAreaView
        style={{
          paddingTop: 10,
          borderTopWidth: 0.5,
          borderStyle: "solid",
          borderTopColor: colors.gray,
          backgroundColor: "white",
        }}
      >
        {!isDeleteMode ? (
          <View style={{ paddingBottom: 10 }}>
            <TextButton
              title={"情報修正"}
              onPress={toModifyDog}
              color={colors.primary}
            />
            <TextButton
              title={"迷子設定"}
              onPress={toSetLost}
              color={colors.secondary}
            />
            <TextButton
              title={"登録解除"}
              onPress={toggleDeleteAlert}
              color={colors.red}
            />
            <TextButton
              title={"キャンセル"}
              onPress={closeDogInfoModal}
              color={colors.gray}
            />
          </View>
        ) : (
          <View style={{ alignItems: "center", paddingBottom: 10 }}>
            <Text style={{ paddingVertical: 10 }}>
              本当に削除してよろしいですか？
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TextButton
                title={"登録解除"}
                onPress={() => deleteDog(dogId)}
                color={colors.red}
              />
              <TextButton
                title={"キャンセル"}
                onPress={closeDogInfoModal}
                color={colors.gray}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default DogInfoModal;
