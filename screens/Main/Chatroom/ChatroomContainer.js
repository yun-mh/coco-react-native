import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import ChatroomPresenter from "./ChatroomPresenter";
import {
  VIEW_CHATROOM,
  SEND_MESSAGE,
  GET_MESSAGE,
} from "../../../queries/Main/MainQueries";

export default ({ navigation, route }) => {
  const myself = route.params.myself;

  const [text, setText] = useState("");
  const [height, setHeight] = useState(40);
  const [messages, setMessages] = useState([]);
  const [sendingLoading, setSendingLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: route.params.counterpartUsername });
  });

  const { data: newData } = useSubscription(GET_MESSAGE, {
    variables: { roomId: route.params.id },
  });

  const { loading, error, data } = useQuery(VIEW_CHATROOM, {
    variables: { id: route.params.id },
  });

  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      roomId: route.params.id,
      message: text,
      toId: route.params.counterpartId,
      token: route.params.token,
    },
    refetchQueries: () => [
      { query: VIEW_CHATROOM, variables: { id: route.params.id } },
    ],
  });

  useEffect(() => {
    if (!loading) {
      const {
        viewChatRoom: { messages },
      } = data;
      setMessages(messages);
    }
  }, [data]);

  const handleNewMessage = () => {
    if (newData !== undefined) {
      const { getMessage } = newData;
      setMessages((prev) => [...prev, getMessage]);
    }
  };

  useEffect(() => {
    handleNewMessage();
  }, [newData]);

  const handleSendMessage = async () => {
    try {
      setSendingLoading(true);
      await sendMessageMutation();
    } catch (error) {
      console.warn(error);
    } finally {
      setText("");
      setSendingLoading(false);
    }
  };

  const updateInputSize = (height) => {
    setHeight(height);
  };

  return (
    <ChatroomPresenter
      loading={loading}
      messages={messages}
      myself={myself}
      text={text}
      setText={setText}
      sendingLoading={sendingLoading}
      handleSendMessage={handleSendMessage}
      height={height}
      updateInputSize={updateInputSize}
    />
  );
};
