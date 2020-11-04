import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import SearchPresenter from "./SearchPresenter";
import { SEARCH } from "../../../queries/Main/MainQueries";

export default ({ navigation }) => {
  const [value, setValue] = useState("");
  const [isUser, setIsUser] = useState(true);
  const [fetch, setFetch] = useState(false);
  const { data, loading } = useQuery(SEARCH, {
    variables: {
      term: value,
    },
    skip: !fetch,
    fetchPolicy: "network-only",
  });

  console.log(data)

  const onChange = (text) => {
    setFetch(false);
    setValue(text);
  };

  const onSubmit = () => {
    setFetch(true);
  };

  const handleUserTab = () => {
    setIsUser(true);
  };

  const handlePostTab = () => {
    setIsUser(false);
  };

  return (
    <SearchPresenter
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      loading={loading}
      data={data}
      isUser={isUser}
      handleUserTab={handleUserTab}
      handlePostTab={handlePostTab}
    />
  );
};
