import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "./fragments";

export const PROFILE_THUMBNAIL = gql`
  query viewMyself {
    viewMyself {
      avatar
    }
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
