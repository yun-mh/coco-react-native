import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";
import constants from "../../constants";

const CommentContainer = styled.View`
  flex-direction: row;
  padding: 12px;
`;

const AuthorContainer = styled.View`
  flex: 1;
`;

const ContentDetail = styled.View`
  flex: 9;
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

const Comment = ({ id, user, text, createdAt }) => {
  const navigation = useNavigation();

  return (
    <CommentContainer>
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
          <Caption>{text}</Caption>
          <CreatedAt>{createdAt.split("T")[0]}</CreatedAt>
        </PostContent>
      </ContentDetail>
    </CommentContainer>
  );
};

export default Comment;
