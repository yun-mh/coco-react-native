import React, { useState } from "react";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { VIEW_USER, FOLLOW, UNFOLLOW } from "../../../queries/Main/MainQueries";
import { useLogOut } from "../../../contexts/AuthContext";

const ProfileContainer = ({ navigation, route }) => {
  const logout = useLogOut();

  const { loading, error, data, refetch } = useQuery(VIEW_USER, {
    variables: { id: route.params.id },
  });

  const [isFollowing, setIsFollowing] = useState(data.viewUser.isFollowing);
  const [isUserInfoModalVisible, setUserInfoModalVisible] = useState(false);
  const [isDogInfoModalVisible, setDogInfoModalVisible] = useState(false);

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

  const toggleUserInfoModal = () => {
    setUserInfoModalVisible(!isUserInfoModalVisible);
  };

  const toggleDogInfoModal = () => {
    setDogInfoModalVisible(!isDogInfoModalVisible);
  };

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
      isUserInfoModalVisible={isUserInfoModalVisible}
      toggleUserInfoModal={toggleUserInfoModal}
      isDogInfoModalVisible={isDogInfoModalVisible}
      toggleDogInfoModal={toggleDogInfoModal}
      logout={logout}
    />
  );
};

export default ProfileContainer;
