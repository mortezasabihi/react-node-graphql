import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query UsersList {
    users {
      _id
      name
      email
      role
    }
  }
`;

export const GET_USER = gql`
  query User($id: String!) {
    user(_id: $id) {
      name
      email
      role
    }
  }
`;
