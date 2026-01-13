import { gql } from "@apollo/client";

const LANGUAGE_FRAGMENT = gql`
  fragment LanguagesFragment on Languages {
    th
    en
  }
`;

const GET_SHOP_LIST = gql`
  query getShopList {
    getShopList {
      result {
        success
        message
      }
      items {
        shopName {
          ...LanguagesFragment
        }

        address {
          ...LanguagesFragment
        }
        location {
          latitude
          longitude
        }
        zipcode
        imageURL
        telephone
        status
      }
    }
  }
  ${LANGUAGE_FRAGMENT}
`;

// const REDEEM_POINT = gql`
//   mutation chexPoint($lineToken: String, $shopId: String) {
//     registerUser(lineToken: $lineToken, shopId: $shopId) {
//       items {
//         shopId
//         starType
//       }
//       result {
//         success
//         message
//       }
//     }
//   }
// `;

export { GET_SHOP_LIST };
