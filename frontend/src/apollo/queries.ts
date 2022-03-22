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
