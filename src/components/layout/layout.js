// import { OrderContextProvider } from "@/context/orderContext";
// import { MenuContextProvider } from "@/context/menuContext";
// import { ShopContextProvider } from "@/context/shopContext";
// import { LiffContextProvider } from "@/context/liffContext";
import { PointContextProvider } from "@/context/pointContext";
import { ShopContextProvider } from "@/context/shopContext";
import { UserContextProvider } from "@/context/userContext";
import { ApolloProvider } from "@apollo/client/react";
import { graphqlClient } from "../../lib/apollo-client";

const RootLayout = ({ children }) => {
  return (
    <ApolloProvider client={graphqlClient}>
      <UserContextProvider>
        <ShopContextProvider>
          <PointContextProvider>
            <div
              className="container  justify-items-center min-h-screen bg-gradient-to-br from-indigo-50
      via-white to-purple-50 flex flex-col p-2 sm:p-4 max-w-full"
            >
              {/* // <div
    //   className="container  justify-items-center
    //     min-h-screen p-2 sm:p-4 max-w-full"
    // > */}
              <div className="flex flex-col w-full">
                {/* <OrderContextProvider> {children} </OrderContextProvider> */}

                {children}

                {/* <MenuPageButton /> */}
              </div>
            </div>
          </PointContextProvider>
        </ShopContextProvider>
      </UserContextProvider>
    </ApolloProvider>
  );
};

export default RootLayout;
