import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import FeedPresenter from "./FeedPresenter";
import { VIEW_FEED, CHECK_MYSELF } from "../../../queries/Main/MainQueries";

export default ({ route }) => {
  const ITEMS = 5;
  
  const flatlistEl = useRef(null);
  
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

  useEffect(() => {
    if (route?.params !== undefined) {
      flatlistEl.current.scrollToOffset({ offset: 0, animated: true, item: route?.params?.posted });
    }
  }, [route?.params?.posted]);

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
      flatlistEl={flatlistEl}
      loading={loading}
      data={posts}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      currentUser={check}
    />
  );
};
