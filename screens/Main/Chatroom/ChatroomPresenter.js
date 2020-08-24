import React, { useRef } from "react";
import {
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import styled from "styled-components";
import { useHeaderHeight } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import MessageBox from "../../../components/Main/MessageBox";
import Loader from "../../../components/Main/Loader";
import colors from "../../../colors";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

const ChatContainer = styled.View`
  flex: 1;
  background-color: ${colors.secondaryShadow};
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
  min-height: 24px;
  padding-right: 10px;
`;

const MessageAddContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export default ({
  loading,
  messages,
  height,
  updateInputSize,
  myself,
  text,
  setText,
  handleSendMessage,
}) => {
  const headerHeight = useHeaderHeight();
  const scrollViewRef = useRef();

  return (
    <Container>
      <ChatContainer>
        {loading ? (
          <View
            style={{
              flex: 1,
              jusfifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </View>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : null}
            keyboardVerticalOffset={headerHeight + 10}
          >
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{ paddingVertical: 20 }}
              onContentSizeChange={() => {
                scrollViewRef.current.scrollToEnd({ animated: false });
              }}
            >
              {messages.map((message) => (
                <MessageBox
                  key={message.id}
                  message={message}
                  isMyself={message.from.id === myself ? true : false}
                />
              ))}
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </ChatContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : null}
        keyboardVerticalOffset={headerHeight}
      >
        <MessageInputContainer>
          <MessageInput
            placeholder="メッセージを入力"
            value={text}
            onChangeText={(text) => setText(text)}
            editable={true}
            multiline={true}
            height={height}
            onContentSizeChange={(e) =>
              updateInputSize(e.nativeEvent.contentSize.height)
            }
          />
          <MessageAddContainer>
            {text !== "" ? (
              <TouchableOpacity onPress={handleSendMessage}>
                <Feather name="send" size={24} color={colors.darkGray} />
              </TouchableOpacity>
            ) : null}
          </MessageAddContainer>
        </MessageInputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};
