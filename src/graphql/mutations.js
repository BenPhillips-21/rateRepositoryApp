import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
mutation Mutation($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`
