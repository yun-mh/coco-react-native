import { HttpLink } from "apollo-boost";

const link = new HttpLink({
  uri: "http://localhost:4000/",
});

const apolloClientOptions = {
  link,
}; // temporary setting

export default apolloClientOptions;
