import React from "react";
import { useQuery } from "@apollo/client";
import {
  VIEW_CHATROOMS,
  CHECK_MYSELF,
} from "../../../queries/Main/MainQueries";
import ChatroomsPresenter from "./ChatroomsPresenter";

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
