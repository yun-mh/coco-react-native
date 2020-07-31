import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../colors";
import TextButton from "./TextButton";

const CommentModal = ({
  isCommentModalVisible,
  toggleCommentModal,
  handleDeleteComment,
}) => {
  return (
    <Modal
      isVisible={isCommentModalVisible}
      onBackdropPress={toggleCommentModal}
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
          title={"削除"}
          color={colors.red}
          onPress={handleDeleteComment}
        />
      </View>
    </Modal>
  );
};

export default CommentModal;
