import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import FeedPresenter from "./FeedPresenter";
import { VIEW_FEED } from "../../../queries/Main/MainQueries";


export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, error, data, refetch } = useQuery(VIEW_FEED);

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

  return <FeedPresenter loading={loading} data={data} refreshing={refreshing} onRefresh={onRefresh} />;
};
