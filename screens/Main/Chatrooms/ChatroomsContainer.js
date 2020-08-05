import React from "react";
import ChatroomsPresenter from "./ChatroomsPresenter";
import {
  VIEW_CHATROOMS,
  CHECK_MYSELF,
} from "../../../queries/Main/MainQueries";
import { useQuery } from "@apollo/react-hooks";

export default () => {
  const { loading, error, data, refetch } = useQuery(VIEW_CHATROOMS);
  const { data: currentUser } = useQuery(CHECK_MYSELF);
  return (
    <ChatroomsPresenter
      loading={loading}
      data={data}
      currentUser={currentUser}
    />
  );
};
