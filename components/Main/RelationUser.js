import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, View } from "react-native";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";
import Button from "./Button";
import { FOLLOW, UNFOLLOW, VIEW_USER } from "../../queries/Main/MainQueries";
import { useMutation } from "@apollo/client";

const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
`;

const UserContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const DataContainer = styled.View`
  margin-left: 10px;
`;

const Username = styled.Text`
  color: ${colors.black};
  font-weight: bold;
`;

const BreedingInfo = styled.Text`
  color: ${colors.gray};
`;

export default ({ currentUser, id, avatar, username, dogs, isFollowing }) => {
  const navigation = useNavigation();

  const [isFollowingS, setIsFollowingS] = useState(isFollowing);

  const [followMutation] = useMutation(FOLLOW, { 
      variables: { 
          id 
      },
      refetchQueries: () => [
        { query: VIEW_USER, variables: { id: currentUser } },
      ],
  });

  const [unfollowMutation] = useMutation(UNFOLLOW, { 
      variables: { 
          id 
      },
      refetchQueries: () => [
        { query: VIEW_USER, variables: { id: currentUser } },
      ], 
  });

  const handleFollow = async () => {
    if (isFollowingS) {
      try {
        setIsFollowingS(false);
        await unfollowMutation();
      } catch (error) {
        console.warn(error);
      }
    } else {
      try {
        setIsFollowingS(true);
        await followMutation();
      } catch (error) {
        console.warn(error);
      }
    }
  };

  return (
    <View style={{ marginVertical: 5 }} >
      <ItemContainer>
        <UserContainer onPress={() => navigation.navigate("Profile", { id })}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25 }}
            source={{ uri: avatar }}
          />
          <DataContainer>
            <Username>{username}</Username>
            <BreedingInfo>{ dogs.length > 0 ? `${dogs[0].name + ( dogs.length > 1 ? "の他" + (dogs.length - 1) + "匹" : "" )}を飼っています` : ""}</BreedingInfo>
          </DataContainer>
        </UserContainer>
        { isFollowingS ? ( 
                <Button text={"アンフォロー"} onPress={handleFollow} />
            ) : (
                <Button text={"フォロー"} accent={true} onPress={handleFollow} />
            )
        }
      </ItemContainer>
    </View>
  );
};