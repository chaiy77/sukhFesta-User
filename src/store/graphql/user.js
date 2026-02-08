import { gql } from "@apollo/client";
// type User {
//   id: String #system ID
//   lineId: String
//   lineName: String
//   registerDate: Float
//   address: Languages
//   tambol: Languages
//   distric: Languages
//   province: Languages
//   zipcode: String
//   silverStars: [Star]
//   goldStars: [Star]
//   result: Result
// }
// input UserDataInput {
//   lineId: String!
//   lineName: String!
//   address: LanguagesInput
//   tambol: LanguagesInput
//   distric: LanguagesInput
//   province: LanguagesInput
//   zipcode: String
// }
// type Mutation {
//   registerUser(input: UserDataInput): User

const LANGUAGE_FRAGMENT = gql`
  fragment LanguagesFragment on Languages {
    th
    en
  }
`;

const STAR_FRAGMENT = gql`
  fragment StarFragment on Star {
    shopId
    type
  }
`;

const REGISTER_USER = gql`
  mutation registerUser($lineToken: String) {
    registerUser(lineToken: $lineToken) {
      items {
        lineName
        lineImage
        registerDate
      }
      result {
        success
        message
      }
    }
  }
`;

const GET_USER_INFO = gql`
  query getUserInfo($lineToken: String) {
    getUserInfo(lineToken: $lineToken) {
      result {
        success
        message
      }
      items {
        id
        lineName
        registerDate
        tokens
        address {
          ...LanguagesFragment
        }
        tambol {
          ...LanguagesFragment
        }
        distric {
          ...LanguagesFragment
        }
        province {
          ...LanguagesFragment
        }
        zipcode
        silverStars {
          ...StarFragment
        }
        goldStars {
          ...StarFragment
        }
      }
    }
  }
  ${STAR_FRAGMENT}
  ${LANGUAGE_FRAGMENT}
`;
const CHEX_POINT = gql`
  mutation chexPoint($userId: String, $shopId: String) {
    chexPoint(userId: $userId, shopId: $shopId) {
      userId
      shopId
      item {
        tokens
        goldStars {
          shopId
          shopName
          type
          date
        }
        silverStars {
          shopId
          shopName
          type
          date
        }
      }
      result {
        success
        errorCode
        message
      }
    }
  }
`;

const ON_CHEXIN_SUBSCRIPTION = gql`
  subscription onUserChexIn($userId: String) {
    onUserChexIn(userId: $userId) {
      result {
        errorCode
        success
        message
      }
    }
  }
`;

const ON_REDEEM_SUBSCRIPTION = gql`
  subscription onUserRedeem($userId: String) {
    onUserRedeem(userId: $userId) {
      userId
      reward
      item {
        tokens
      }
      result {
        errorCode
        success
        message
      }
    }
  }
`;

export {
  REGISTER_USER,
  GET_USER_INFO,
  CHEX_POINT,
  ON_REDEEM_SUBSCRIPTION,
  ON_CHEXIN_SUBSCRIPTION,
};
