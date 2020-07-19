import React from "react";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery } from "@apollo/react-hooks";
import { VIEW_USER } from "../../../queries/Main/MainQueries";

const ProfileContainer = ({ navigation, route }) => {
  const { loading, error, data, refetch } = useQuery(VIEW_USER, {
    variables: { id: route.params.id },
  });
  console.log(data);

  return <ProfilePresenter loading={loading} data={data} />;
};

export default ProfileContainer;
