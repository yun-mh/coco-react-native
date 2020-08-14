import React, { useState, useEffect } from "react";
import NotificationPresenter from "./NotificationPresenter";
import {
  GET_COMMENT_NOTIFICATION,
  VIEW_NOTIFICATION,
} from "../../../queries/Main/MainQueries";
import { useSubscription, useQuery } from "@apollo/client";

export default ({ route }) => {
  const [currentUser, setCurrentUser] = useState(route.params.id);
  const [notifications, setNotifications] = useState([]);

  const { loading, error, data } = useQuery(VIEW_NOTIFICATION);

  // const { data: commentData } = useSubscription(GET_COMMENT_NOTIFICATION, {
  //   variables: { id: route.params.id },
  // });

  useEffect(() => {
    if (!loading) {
      const { viewNotification } = data;
      const target = viewNotification.filter(
        (item) => item.from !== currentUser
      );
      console.log(viewNotification);
      setNotifications([...target]);
    }
  }, [data]);

  return (
    <NotificationPresenter
      loading={loading}
      notifications={notifications}
      currentUser={currentUser}
    />
  );
};
