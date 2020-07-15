import React, { useState } from "react";
import { Image, FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";
import Comment from "./Comment";

const Container = styled.View`
  flex: 1;
  margin-bottom: 30px;
  background-color: ${colors.white};
`;

const PostContentContainer = styled.View`
  flex-direction: row;
  border-bottom-width: 0.5px;
  border-bottom-color: lightgray;
  border-style: solid;
  padding: 12px;
`;

const AuthorContainer = styled.View``;

const ContentDetail = styled.View`
  margin-left: 10px;
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

const CommentContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const CommentInputContainer = styled.View`
  flex-direction: row;
  padding-vertical: 20px;
  padding-horizontal: 10px;
  justify-content: center;
  border-bottom-width: 0.5px;
  border-bottom-color: lightgray;
  border-top-width: 0.5px;
  border-top-color: lightgray;
  border-style: solid;
`;

const CommentInput = styled.TextInput`
  flex: 9;
  height: ${(props) => props.height}px;
`;

const CommentAddContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const PostDetail = ({
  id,
  user,
  caption,
  createdAt,
  comments,
  refreshing,
  onRefresh,
  comment,
  height,
  setComment,
  updateInputSize,
  handleAddComment,
}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <PostContentContainer>
        <AuthorContainer>
          <Touchable
            onPress={() =>
              navigation.navigate("UserDetail", { username: user.username })
            }
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{ uri: user.avatar }}
            />
          </Touchable>
        </AuthorContainer>
        <ContentDetail>
          <Touchable
            onPress={() =>
              navigation.navigate("UserDetail", { username: user.username })
            }
          >
            <UserContainer>
              <Bold>{user.username}</Bold>
            </UserContainer>
          </Touchable>
          <PostContent>
            <Caption>{caption}</Caption>
            <CreatedAt>{createdAt.split("T")[0]}</CreatedAt>
          </PostContent>
        </ContentDetail>
      </PostContentContainer>

      <CommentContainer>
        <FlatList
          style={{ width: "100%" }}
          data={comments}
          renderItem={({ item }) => (
            <Comment
              id={item.id}
              user={item.user}
              text={item.text}
              createdAt={item.createdAt}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
        />
      </CommentContainer>

      <CommentInputContainer>
        <CommentInput
          placeholder="コメントを入力"
          onChangeText={(comment) => setComment(comment)}
          height={height}
          editable={true}
          multiline={true}
          value={comment}
          onContentSizeChange={(e) =>
            updateInputSize(e.nativeEvent.contentSize.height)
          }
        />
        <CommentAddContainer onPress={handleAddComment}>
          <Feather name="edit-3" size={24} color="black" />
        </CommentAddContainer>
      </CommentInputContainer>
    </Container>
  );
};

export default PostDetail;
