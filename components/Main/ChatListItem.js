import React from "react";
import styled from "styled-components/native";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";

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
  const orderedMessages = messages.sort(compare);
  const today = new Date();
  const messageDate = new Date(orderedMessages[0].createdAt);
  let date = "";
  if (today.toDateString() == messageDate.toDateString()) {
    date += messageDate.getHours() + ":";
    date +=
      messageDate.getMinutes().length < 2
        ? "0" + messageDate.getMinutes()
        : messageDate.getMinutes();
  } else if (today.getFullYear() !== messageDate.getFullYear()) {
    date +=
      messageDate.getFullYear() +
      "-" +
      (messageDate.getMonth() + 1) +
      "-" +
      messageDate.getDate();
  } else {
    date += messageDate.getMonth() + 1 + ". " + messageDate.getDate() + ".";
  }

  const toChatroom = () => {
    navigation.navigate("Chatroom", { id, username: counterpart.username });
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
