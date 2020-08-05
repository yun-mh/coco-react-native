import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import FeedPresenter from "./FeedPresenter";
import { VIEW_FEED, CHECK_MYSELF } from "../../../queries/Main/MainQueries";

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, error, data, refetch } = useQuery(VIEW_FEED);
  const { data: check } = useQuery(CHECK_MYSELF);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <FeedPresenter
      loading={loading}
      data={data}
      refreshing={refreshing}
      onRefresh={onRefresh}
      currentUser={check}
    />
  );
};
