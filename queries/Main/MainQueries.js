import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "./fragments";

export const PROFILE_THUMBNAIL = gql`
  query viewMyself {
    viewMyself {
      id
      avatar
    }
  }
`;

export const VIEW_USER = gql`
  query viewUser($id: String!) {
    viewUser(id: $id) {
      id
      avatar
      username
      email
      followingCount
      followersCount
      postsCount
      dogs {
        id
        image
        name
      }
      posts {
        id
        files {
          url
        }
      }
      isFollowing
      isMyself
    }
  }
`;

export const FOLLOW = gql`
  mutation follow($id: String!) {
    follow(id: $id)
  }
`;

export const UNFOLLOW = gql`
  mutation unfollow($id: String!) {
    unfollow(id: $id)
  }
`;

export const VIEW_FEED = gql`
  query viewFeed {
    viewFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const VIEW_POST = gql`
  query viewPost($id: String!) {
    viewPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text)
  }
`;
