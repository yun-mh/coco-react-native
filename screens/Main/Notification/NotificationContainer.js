import React, { useState, useEffect } from "react";
import NotificationPresenter from "./NotificationPresenter";
import {
  GET_NOTIFICATION,
  VIEW_NOTIFICATION,
} from "../../../queries/Main/MainQueries";
import { useSubscription, useQuery } from "@apollo/client";

export default ({ route }) => {
  const [currentUser, setCurrentUser] = useState(route.params.id);
  const [notifications, setNotifications] = useState([]);

  const { loading, error, data } = useQuery(VIEW_NOTIFICATION);

  const { data: newData } = useSubscription(GET_NOTIFICATION, {
    variables: { id: currentUser },
  });

  useEffect(() => {
    if (!loading) {
      const { viewNotification } = data;
      const target = viewNotification.filter(
        (item) => item.from.id !== currentUser
      );
      setNotifications([...target]);
    }
  }, [data]);

  const handleNewNotification = () => {
    if (newData !== undefined) {
      const { getNotification } = newData;
      setNotifications((prev) => [getNotification, ...prev]);
    }
  };

  useEffect(() => {
    handleNewNotification();
  }, [newData]);

  return (
    <NotificationPresenter
      loading={loading}
      notifications={notifications}
      currentUser={currentUser}
    />
  );
};
