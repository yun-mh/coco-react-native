import React, { useState } from "react";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { VIEW_USER, FOLLOW, UNFOLLOW } from "../../../queries/Main/MainQueries";

const ProfileContainer = ({ navigation, route }) => {
  const { loading, error, data, refetch } = useQuery(VIEW_USER, {
    variables: { id: route.params.id },
  });
  const [isFollowing, setIsFollowing] = useState(data.viewUser.isFollowing);
  console.log(isFollowing);

  const [followMutation] = useMutation(FOLLOW, {
    variables: {
      id: route.params.id,
    },
  });

  const [unfollowMutation] = useMutation(UNFOLLOW, {
    variables: {
      id: route.params.id,
    },
  });

  const handleFollow = async () => {
    if (isFollowing) {
      try {
        setIsFollowing(false);
        await unfollowMutation();
      } catch (error) {
        console.warn(error);
      }
    } else {
      try {
        setIsFollowing(true);
        await followMutation();
      } catch (error) {
        console.warn(error);
      }
    }
  };

  return (
    <ProfilePresenter
      loading={loading}
      data={data}
      isFollowing={isFollowing}
      handleFollow={handleFollow}
    />
  );
};

export default ProfileContainer;
