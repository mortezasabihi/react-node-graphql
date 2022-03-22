import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation RemoveUser($_id: String!) {
    removeUser(_id: $_id)
  }
`;
