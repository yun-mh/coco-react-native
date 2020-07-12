import { gql } from "apollo-boost";

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
      id
      location
      caption
    }
  }
`;
