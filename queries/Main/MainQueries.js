import { gql } from "@apollo/client";

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
      dogs {
        name
      }
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
      followers {
        id
        avatar
        username
        dogs {
          name
        }
        isFollowing
      }
      following {
        id
        avatar
        username
        dogs {
          name
        }
        isFollowing
      }
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
        isMissed
      }
      posts {
        id
        files {
          url
        }
      }
      isFollowing
      isMyself
      token
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

export const SET_TOKEN = gql`
  mutation setToken($token: String!) {
    setToken(token: $token) {
      id
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

export const TOGGLE_STATUS = gql`
  mutation toggleMissingStatus(
    $id: String!
    $isMissed: Boolean!
  ) {
    toggleMissingStatus(
      id: $id
      isMissed: $isMissed
    )
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
  query viewFeed($offset: Int!, $limit: Int!) {
    viewFeed(offset: $offset, limit: $limit) {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
          avatar
        }
        createdAt
      }
      createdAt
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const VIEW_POST = gql`
  query viewPost($id: String!) {
    viewPost(id: $id) {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
          avatar
        }
        createdAt
      }
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text)
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: String!) {
    deleteComment(id: $id) {
      id
      text
    }
  }
`;

export const UPLOAD_POST = gql`
  mutation uploadPost($caption: String, $files: [String!]!, $location: String) {
    uploadPost(caption: $caption, files: $files, location: $location) {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
          avatar
        }
        createdAt
      }
      createdAt
    }
  }
`;

export const EDIT_POST = gql`
  mutation editPost(
    $id: String!
    $caption: String
    $location: String
    $action: ACTIONS!
  ) {
    editPost(id: $id, caption: $caption, location: $location, action: $action) {
      id
      location
      caption
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

export const VIEW_NOTIFICATION = gql`
  query viewNotification {
    viewNotification {
      id
      from {
        id
        avatar
        username
        followers {
          id
        }
      }
      user {
        id
      }
      comment {
        post {
          id
        }
        text
      }
      post {
        likes {
          id
          user {
            id
            avatar
            username
          }
        }
      }
      type
    }
  }
`;

export const GET_NOTIFICATION = gql`
  subscription getNotification($id: String!) {
    getNotification(id: $id) {
      id
      from {
        id
        avatar
        username
        followers {
          id
        }
      }
      user {
        id
      }
      comment {
        post {
          id
        }
        text
      }
      post {
        id
        likes {
          id
          user {
            id
            avatar
            username
          }
        }
      }
      type
    }
  }
`;

export const VIEW_CHATROOMS = gql`
  query viewChatRooms {
    viewChatRooms {
      id
      participants {
        id
        avatar
        username
        token
      }
      messages {
        id
        from {
          id
        }
        text
        createdAt
        read
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CHATROOMS = gql`
  subscription getChatrooms($id: String!) {
    getChatrooms(id: $id) {
      id
      participants {
        id
        avatar
        username
      }
      messages {
        id
        text
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_FRIENDS = gql`
  query viewMyself {
    viewMyself {
      following {
        id
        avatar
        username
      }
    }
  }
`;

export const CREATE_CHATROOM = gql`
  mutation createChatRoom($toId: String!) {
    createChatRoom(toId: $toId) {
      id
      participants {
        id
      }
    }
  }
`;

export const VIEW_CHATROOM = gql`
  query viewChatRoom($id: String!) {
    viewChatRoom(id: $id) {
      id
      participants {
        id
        avatar
        username
      }
      messages {
        id
        text
        from {
          id
          avatar
        }
        createdAt
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($roomId: String, $message: String!, $toId: String, $token: String) {
    sendMessage(roomId: $roomId, message: $message, toId: $toId, token: $token) {
      id
      text
      from {
        id
        username
        avatar
      }
      to {
        id
        username
        avatar
      }
      chatroom {
        id
      }
      createdAt
    }
  }
`;

export const GET_MESSAGE = gql`
  subscription getMessage($roomId: String!) {
    getMessage(roomId: $roomId) {
      id
      text
      from {
        id
        username
        avatar
      }
      to {
        id
        username
        avatar
      }
      chatroom {
        id
      }
      createdAt
    }
  }
`;
