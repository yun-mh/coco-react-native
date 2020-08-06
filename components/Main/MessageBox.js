import React from "react";
import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../colors";
import utils from "../../utils";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding-horizontal: 14px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: ${({ isMyself }) => (isMyself ? "flex-end" : "flex-start")};
`;

const MessageContainer = styled.View`
  background-color: ${({ isMyself }) =>
    isMyself ? colors.primary : colors.white};
  border-radius: 10px;
  padding: 10px;
  margin-left: ${({ isMyself }) => (isMyself ? 10 : 0)}px;
  margin-right: ${({ isMyself }) => (isMyself ? 0 : 10)}px;
`;

const Message = styled.Text`
  color: ${({ isMyself }) => (!isMyself ? colors.black : colors.white)};
  max-width: ${wp("50%")}px;
`;

const Time = styled.Text`
  font-size: 12px;
  color: ${colors.darkGray};
  padding-bottom: 5px;
`;

export default ({ message, isMyself }) => {
  const { from, text, createdAt } = message;
  const time = utils.formatTime(createdAt);

  return (
    <Container>
      {!isMyself ? <Avatar source={{ uri: from.avatar }} /> : null}
      <ContentContainer isMyself={isMyself}>
        {isMyself ? <Time>{time}</Time> : null}
        <MessageContainer isMyself={isMyself}>
          <Message isMyself={isMyself}>{text}</Message>
        </MessageContainer>
        {!isMyself ? <Time>{time}</Time> : null}
      </ContentContainer>
    </Container>
  );
};
