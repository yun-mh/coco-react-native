import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import PostPresenter from "./PostPresenter";
import { VIEW_POST } from "../../../queries/Main/MainQueries";

export default ({ route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, error, data, refetch } = useQuery(VIEW_POST, {
    variables: { id: route.params.id },
  });

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
    <PostPresenter
      loading={loading}
      data={data}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};
