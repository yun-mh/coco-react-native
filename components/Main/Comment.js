import React, { useState } from "react";
import { Image, TouchableHighlight } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_COMMENT, VIEW_POST } from "../../queries/Main/MainQueries";
import colors from "../../colors";
import CommentModal from "./CommentModal";

const CommentContainer = styled.View`
  flex-direction: row;
  padding: 12px;
`;

const AuthorContainer = styled.View`
  flex: 1;
`;

const ContentDetail = styled.View`
  flex: 9;
  margin-left: 16px;
`;

const Touchable = styled.TouchableOpacity``;

const UserContainer = styled.View``;

const PostContent = styled.View``;

const Bold = styled.Text`
  font-weight: 500;
`;

const Caption = styled.Text``;

const CreatedAt = styled.Text`
  color: gray;
`;

const Comment = ({ id, user, text, createdAt, postId, currentUser }) => {
  const navigation = useNavigation();
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT, {
    variables: {
      id,
    },
    refetchQueries: () => [{ query: VIEW_POST, variables: { id: postId } }],
  });

  const toggleCommentModal = () => {
    setIsCommentModalVisible(!isCommentModalVisible);
  };

  const handleDeleteComment = async () => {
    try {
      const { data: deleteComment } = await deleteCommentMutation();
      if (deleteComment) {
        setIsCommentModalVisible(false);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <TouchableHighlight
      underlayColor={colors.secondary}
      onLongPress={() => {
        if (user.id === currentUser) {
          toggleCommentModal();
        }
      }}
    >
      <CommentContainer>
        <AuthorContainer>
          <Touchable
            onPress={() => navigation.navigate("Profile", { id: user.id })}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{ uri: user.avatar }}
            />
          </Touchable>
        </AuthorContainer>
        <ContentDetail>
          <Touchable
            onPress={() => navigation.navigate("Profile", { id: user.id })}
          >
            <UserContainer>
              <Bold>{user.username}</Bold>
            </UserContainer>
          </Touchable>
          <PostContent>
            <Caption>{text}</Caption>
            <CreatedAt>{createdAt.split("T")[0]}</CreatedAt>
          </PostContent>
        </ContentDetail>
        <CommentModal
          isCommentModalVisible={isCommentModalVisible}
          toggleCommentModal={toggleCommentModal}
          handleDeleteComment={handleDeleteComment}
        />
      </CommentContainer>
    </TouchableHighlight>
  );
};

export default Comment;
