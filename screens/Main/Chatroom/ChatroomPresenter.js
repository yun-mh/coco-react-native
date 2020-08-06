import React from "react";
import styled from "styled-components";
import colors from "../../../colors";
import { Feather } from "@expo/vector-icons";
import MessageBox from "../../../components/Main/MessageBox";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
  padding-vertical: 20px;
`;

const ChatContainer = styled.View`
  flex: 1;
  background-color: ${colors.secondaryShadow};
  padding-vertical: 20px;
`;

const ScrollView = styled.ScrollView``;

const MessageInputContainer = styled.View`
  background-color: ${colors.white};
  flex-direction: row;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: lightgray;
  border-top-width: 0.5px;
  border-top-color: lightgray;
  border-style: solid;
`;

const MessageInput = styled.TextInput`
  flex: 9;
  height: ${({ height }) => height}px;
  padding-right: 10px;
`;

const MessageAddContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export default ({ loading, height, updateInputSize, data, myself }) => {
  const {
    viewChatRoom: { messages },
  } = data;

  return (
    <Container>
      <ChatContainer>
        <ScrollView>
          {messages.map((message) => (
            <MessageBox
              message={message}
              isMyself={message.from.id === myself ? true : false}
            />
          ))}
        </ScrollView>
      </ChatContainer>
      <MessageInputContainer>
        <MessageInput
          placeholder="メッセージを入力"
          editable={true}
          multiline={true}
          height={height}
          onContentSizeChange={(e) =>
            updateInputSize(e.nativeEvent.contentSize.height)
          }
        />
        <MessageAddContainer>
          <Feather name="send" size={24} color={colors.darkGray} />
        </MessageAddContainer>
      </MessageInputContainer>
    </Container>
  );
};
