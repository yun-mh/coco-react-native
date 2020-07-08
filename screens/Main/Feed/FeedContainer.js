import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { POST_FRAGMENT } from "../../../fragments";
import FeedPresenter from "./FeedPresenter";
import { VIEW_FEED } from "../../../queries/Auth/MainQueries";

export const FEED_QUERY = gql`
  {
    viewFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, error, data, refetch } = useQuery(VIEW_FEED);
  console.log(data);

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return <FeedPresenter loading={loading} data={data} />;
};
