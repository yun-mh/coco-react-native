import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const PASSWORD_RESET = gql`
  mutation passwordReset($email: String!) {
    passwordReset(email: $email)
  }
`;

export const CODE_CHECK = gql`
  mutation codeCheck($code: String!, $email: String!) {
    codeCheck(code: $code, email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $avatar: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      avatar: $avatar
      username: $username
      email: $email
      password: $password
    )
  }
`;

export const SET_DOG = gql`
  mutation setDog(
    $image: String
    $name: String!
    $breed: String!
    $gender: String!
    $birthdate: String!
    $email: String!
  ) {
    setDog(
      image: $image
      name: $name
      breed: $breed
      gender: $gender
      birthdate: $birthdate
      email: $email
    )
  }
`;
