import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetAllUsers {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

export const GET_BUSINESSES = gql`
  query GetAllBusinesses {
    getBusinesses {
      id
      name
      yearOfEstablishment
      owner
    }
  }
`;
