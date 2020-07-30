import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "./fragments";

export const CHECK_MYSELF = gql`
  query viewMyself {
    viewMyself {
      id
    }
  }
`;

export const PROFILE_THUMBNAIL = gql`
  query viewMyself {
    viewMyself {
      id
      avatar
    }
  }
`;

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
    }
    searchUser(term: $term) {
      id
      avatar
      username
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
        breed
        gender
        birthdate
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

export const EDIT_USER = gql`
  mutation editUser($username: String!, $avatar: String!) {
    editUser(username: $username, avatar: $avatar) {
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
        breed
        gender
        birthdate
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

export const ADD_DOG = gql`
  mutation registerDog(
    $image: String
    $name: String!
    $breed: String!
    $gender: String!
    $birthdate: String!
  ) {
    registerDog(
      image: $image
      name: $name
      breed: $breed
      gender: $gender
      birthdate: $birthdate
    ) {
      id
      image
      name
      breed
      gender
      birthdate
    }
  }
`;

export const MODIFY_DOG = gql`
  mutation editDog(
    $id: String!
    $name: String
    $image: String
    $breed: String
    $gender: String
    $birthdate: String
    $action: ACTIONS!
  ) {
    editDog(
      id: $id
      name: $name
      image: $image
      breed: $breed
      gender: $gender
      birthdate: $birthdate
      action: $action
    ) {
      id
      image
      name
      breed
      gender
      birthdate
    }
  }
`;

export const DELETE_DOG = gql`
  mutation editDog($id: String!, $action: ACTIONS!) {
    editDog(id: $id, action: $action) {
      id
      image
      name
      breed
      gender
      birthdate
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

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text)
  }
`;

export const UPLOAD_POST = gql`
  mutation uploadPost(
    $caption: String!
    $files: [String!]!
    $location: String
  ) {
    uploadPost(caption: $caption, files: $files, location: $location) {
      id
      caption
      files {
        id
        url
      }
      location
    }
  }
`;

export const DELETE_POST = gql`
  mutation editPost($id: String!, $action: ACTIONS!) {
    editPost(id: $id, action: $action) {
      id
      location
      caption
    }
  }
`;
