import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import FeedPresenter from "./FeedPresenter";
import { VIEW_FEED, CHECK_MYSELF } from "../../../queries/Main/MainQueries";

export default () => {
  const ITEMS = 3; // fix this later

  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);

  const { loading, data, refetch, fetchMore } = useQuery(VIEW_FEED, {
    variables: {
      offset: 0,
      limit: ITEMS,
    },
  });

  const onEndReached = async () => {
    if (!loading && data) {
      await fetchMore({
        variables: {
          offset: data?.viewFeed?.length,
          limit: ITEMS,
        },
      });
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      setPosts(data.viewFeed);
    }
  }, [data]);

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
      data={posts}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      currentUser={check}
    />
  );
};
