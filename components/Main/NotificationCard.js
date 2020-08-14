import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import colors from "../../colors";
import utils from "../../utils";
import { useMutation } from "@apollo/client";
import { FOLLOW } from "../../queries/Main/MainQueries";

const Container = styled.View`
  background-color: ${colors.white};
  border-radius: 5px;
  flex-direction: row;
  align-items: flex-start;
  padding: 14px;
  margin-bottom: 14px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const DataContainer = styled.View`
  flex: 1;
`;

const Message = styled.Text`
  font-size: 13px;
`;

const Example = styled.Text`
  color: ${colors.gray};
`;

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  border: 1px solid ${colors.grayShadow};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({ followDone }) =>
    followDone === true ? colors.grayShadow : colors.white};
`;

const TouchableIconContainer = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border: 1px solid
    ${({ followDone }) =>
      followDone === false ? colors.primary : colors.grayShadow};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({ followDone }) =>
    followDone === false ? colors.primary : colors.white};
`;

function selectIcon(type, followDone) {
  switch (type) {
    case "COMMENT":
      return "message-square";
    case "LIKE":
      return "heart";
    case "FOLLOW":
      if (followDone) {
        return "user-check";
      }
      return "user-plus";
  }
}

const NotificationCard = ({ id, from, type, post, currentUser }) => {
  const [comment, setComment] = useState([]);
  const [followDone, setFollowDone] = useState(false);

  const [followMutation] = useMutation(FOLLOW, {
    variables: {
      id: from.id,
    },
  });

  const handleFollow = async () => {
    if (!followDone) {
      try {
        setFollowDone(true);
        await followMutation();
      } catch (error) {
        console.warn(error);
      }
    }
  };

  useEffect(() => {
    if (type === "COMMENT") {
      const target = post.comments.concat().sort(utils.compare)[0];
      if (target.user.id !== currentUser) {
        setComment(target);
      }
      return;
    } else if (type === "FOLLOW") {
      const followExists = from.followers.find(
        (item) => item.id === currentUser
      );
      if (followExists !== undefined) {
        setFollowDone(true);
      }
    }
  }, [post, from]);

  return (
    <Container>
      <Avatar source={{ uri: from.avatar }} />
      <DataContainer>
        <Message>
          {type === "COMMENT" && `${from.username}さんがコメントしました。`}
          {type === "LIKE" &&
            `${from.username}さんがあなたのポストに共感しました。`}
          {type === "FOLLOW" &&
            `${from.username}さんがあなたをフォローしました。`}
        </Message>
        <Example>{type === "COMMENT" && `"${comment?.text}"`}</Example>
      </DataContainer>
      {type === "COMMENT" ||
      type === "LIKE" ||
      (type === "FOLLOW" && followDone === true) ? (
        <IconContainer followDone={followDone}>
          <Feather
            name={selectIcon(type, followDone)}
            size={20}
            color={colors.darkGray}
          />
        </IconContainer>
      ) : (
        <TouchableIconContainer followDone={followDone} onPress={handleFollow}>
          <Feather
            name={selectIcon(type, followDone)}
            size={20}
            color={colors.white}
          />
        </TouchableIconContainer>
      )}
    </Container>
  );
};

export default NotificationCard;
