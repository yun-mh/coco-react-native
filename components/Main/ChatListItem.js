import React from "react";
import styled from "styled-components/native";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";
import utils from "../../utils";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${colors.white};
  border-bottom-width: 0.3px;
  border-bottom-color: ${colors.gray};
  padding: 14px;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  flex: 1;
  margin-right: 10px;
`;

const Username = styled.Text`
  font-weight: 500;
`;

const Message = styled.Text`
  font-size: 12px;
  color: ${colors.darkGray};
`;

const Time = styled.Text`
  font-size: 10px;
  color: ${colors.darkGray};
`;

function compare(a, b) {
  const aDate = a.createdAt;
  const bDate = b.createdAt;

  let result = 0;
  if (aDate > bDate) {
    result = -1;
  } else if (aDate < bDate) {
    result = 1;
  }
  return result;
}

const ChatListItems = ({ id, messages, participants, currentUser }) => {
  const navigation = useNavigation();

  const counterpart = participants.filter(
    (person) => person.id !== currentUser
  )[0];
  const orderedMessages = messages.concat().sort(compare);

  const date = utils.formatDate(orderedMessages[0].createdAt);

  const toChatroom = () => {
    navigation.navigate("Chatroom", {
      id,
      counterpartId: counterpart.id,
      counterpartUsername: counterpart.username,
      myself: currentUser,
    });
  };

  return (
    <Container onPress={toChatroom}>
      <Avatar source={{ uri: counterpart.avatar }} />
      <InfoContainer>
        <Username>{counterpart.username}</Username>
        <Message>
          {orderedMessages[0].text.length > 28
            ? orderedMessages[0].text.slice(0, 28) + "..."
            : orderedMessages[0].text}
        </Message>
      </InfoContainer>
      <Time>{date}</Time>
    </Container>
  );
};

export default ChatListItems;
