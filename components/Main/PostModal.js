import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../colors";
import TextButton from "./TextButton";

const PostModal = ({
  id,
  files,
  location,
  caption,
  isPostModalVisible,
  toPostEdit,
  togglePostModal,
  handleDeletePost,
}) => {
  return (
    <Modal
      isVisible={isPostModalVisible}
      onBackdropPress={togglePostModal}
      animationIn="fadeIn"
      animationInTiming={50}
      animationOut="fadeOut"
      animationOutTiming={50}
      backdropTransitionInTiming={50}
      backdropTransitionOutTiming={100}
      style={{ alignItems: "center" }}
    >
      <View
        style={{
          width: wp("50%"),
          backgroundColor: "white",
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        <TextButton
          title={"修正"}
          color={colors.primary}
          onPress={toPostEdit}
        />
        <TextButton
          title={"削除"}
          color={colors.red}
          onPress={handleDeletePost}
        />
      </View>
    </Modal>
  );
};

export default PostModal;
