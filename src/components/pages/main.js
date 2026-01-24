import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import Image from "next/image";
// import { usePointContext } from "@/context/pointContext";
// import { dummyMyPoint, shopListArray } from "@/tools/dummyData";
import { callApiLog } from "@/tools/apiLog";
import UserMainPageComponent from "../user/userInfo";
import ShopItemDetailComponent from "../shop/shopItemDetail";
import ShopItemShortDetailComponent from "../shop/shopItemShortDetail";
import { useShopContext } from "@/context/shopContext";
import { useUserContext } from "@/context/userContext";
import StarTable from "../table/starTable";
import { GET_SHOP_LIST } from "@/store/graphql/shop";
import { useQuery } from "@apollo/client/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function MainComponent({ gotoPage }) {
  const [point, setPoint] = useState(0);
  // const { pointDataList } = usePointContext();
  const { selectShop, shopList, setShopList } = useShopContext();
  const { user } = useUserContext();
  const { data, loading, error } = useQuery(GET_SHOP_LIST);

  // useEffect(() => {
  //   setPoint(pointDataList.length);
  //   callApiLog("Main => PointDataList =>" + JSON.stringify(pointDataList));
  // }, [pointDataList]);

  useEffect(() => {

    // console.log("main start");

    selectShop(null);
  }, []);

  useEffect(() => {
    // console.log(data);
    if (data) {
      let result = data?.getShopList?.result;
      // console.log(result);
      if (result.success) {
        let _shopList = data?.getShopList.items;
        // console.log("Gql.Shop.getSohpList = ", _shopList);
        // callApiLog(
        //   "Gql.Shop.getSohpList -> 62  = " + JSON.stringify(_shopList)
        // );
        setShopList(_shopList);
      } else {
        // console.log("Gql.Shop.getSohpList error = ", result.message);

      }
    }
  }, [data, error]);

//   useEffect(() => {
//     if (shopList.length > 0) {
// <<<<<<< HEAD
//       // console.log("ShopList = ", shopList);
// =======
//       console.log("ShopList = ", shopList);
// >>>>>>> 1d4af4d (init git)
//     }
//   }, [shopList]);

  const onMapClickHandle = () => {
    gotoPage("map");
  };

  return (
    //[10px_1fr_20px] -> 3 rows = [10px, 1fr , 20px]

    <div
      // grid grid-cols-1 h-screen border-2 border-black
      //         grid-rows-[10px_1fr_2fr_10px]
      className={`${geistSans.className} ${geistMono.className} grid 
      grid-rows-[10px_1fr_auto] gap-2 h-screen  font-[family-name:var(--font-geist-sans)]`}
    >
      {/* <div className="flex flex-col w-full"> */}
      <div
        className="bg-blue-300 p-4 text-white text-xl font-bold 
              row-start-2 flex items-center justify-center border-b border-gray-500"
      >
        <UserMainPageComponent user={user} />
      </div>

      <div
        className="bg-green-500 pt-4 p-2 text-white text-xl font-bold 
              row-start-3  border-b border-gray-500"
      >
        <div className="grid grid-cols-1 gap-3 flex flex-col mx-auto justify-center md:w-4/5">
          {/* {shopListArray.map((shop) => { */}

          {shopList.map((shop, index) => {
            // console.log(shop);
            if (shop.status == "active") {
              return (
                <div key={index}>
                  <ShopItemShortDetailComponent
                    shop={shop}
                    onMapClick={onMapClickHandle}
                  />
                </div>
              );
            }

          })}
        </div>
      </div>
      {/* <div
            className={
              point > 99
                ? "mx-auto  text-[#55FFDD] text-[8rem]"
                : "mx-auto  text-[#55FFDD] text-[10rem]"
            }
          >
            {point}
          </div>
          <div>
            <StarTable />
          </div> */}
      {/* </div> */}

      {/* <div className="row-start-4 z-99 w-full flex gap-[24px] flex-wrap items-center justify-center">
        <div className="flex w-full items-center justify-center">
          {" "}
          <button
            type="button"
            className=" w-11/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              console.log("test");
              gotoPage("scanQR");
            }}
          >
            Check Point
          </button>
        </div>
      </div> */}
    </div>
  );
}
