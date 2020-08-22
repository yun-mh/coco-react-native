import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import FeedPresenter from "./FeedPresenter";
import { VIEW_FEED, CHECK_MYSELF } from "../../../queries/Main/MainQueries";

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const ITEMS = 1;

  const { loading, data, refetch, fetchMore } = useQuery(VIEW_FEED, {
    variables: {
      offset: 0,
      limit: ITEMS,
    },
  });

  const onEndReached = async () => {
    if (!loading) {
      await fetchMore({
        variables: {
          offset: data?.viewFeed?.length + 1,
        },
      });
    }
  };

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
      onEndReached={onEndReached}
      currentUser={check}
    />
  );
};
