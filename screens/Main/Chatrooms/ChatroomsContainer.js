import React, { useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import {
  VIEW_CHATROOMS,
  GET_CHATROOMS,
} from "../../../queries/Main/MainQueries";
import ChatroomsPresenter from "./ChatroomsPresenter";

export default ({ route }) => {
  const [currentUser, setCurrentUser] = useState(route.params.id);
  const [rooms, setRooms] = useState([]);

  const { data: newData } = useSubscription(GET_CHATROOMS, {
    variables: { id: route.params.id },
  });

  const { loading, error, data } = useQuery(VIEW_CHATROOMS);

  useEffect(() => {
    if (!loading) {
      const { viewChatRooms } = data;
      setRooms([...viewChatRooms]);
    }
  }, [data]);

  const handleNewChatroom = () => {
    if (newData !== undefined) {
      const { getChatrooms } = newData;
      let target = rooms.find((room) => room.id === getChatrooms.id);
      if (target === undefined) {
        setRooms((prev) => [getChatrooms, ...prev]);
      } else {
        setRooms((prev) => {
          target = getChatrooms;
        });
      }
    }
  };

  useEffect(() => {
    if (newData !== undefined) {
      handleNewChatroom();
    }
  }, [newData]);

  return (
    <ChatroomsPresenter
      loading={loading}
      rooms={rooms}
      currentUser={currentUser}
    />
  );
};
