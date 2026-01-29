import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import _ from "lodash";

import Image from "next/image";
import { callApiLog } from "@/tools/apiLog";
import UserMainPageComponent from "../user/userInfo";
import ShopItemDetailComponent from "../shop/shopItemDetail";
import ShopItemShortDetailComponent from "../shop/shopItemShortDetail";
import HorizontalSliderMenu from "../sliderMenu/slidermenu";
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

const shopCategoryMenuList = [
  "ทุกร้าน",
  "ร้านอาหาร/เครื่องดื่ม",
  "โรงแรม/ที่พัก",
  "บริการ",
  "สินค้า",
  "รถเช่า",
];
const categoryList = [
  "none",
  "food",
  "hotel",
  "service",
  "consumer",
  "carrent",
];

export default function MainComponent({ gotoPage }) {
  const [point, setPoint] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const {
    selectShop,
    shopList,
    setShopList,
    selectedShopList,
    setSelectShopList,
  } = useShopContext();
  const { user } = useUserContext();
  const { data, loading, error } = useQuery(GET_SHOP_LIST);

  // useEffect(() => {
  //   setPoint(pointDataList.length);
  //   callApiLog("Main => PointDataList =>" + JSON.stringify(pointDataList));
  // }, [pointDataList]);

  // useEffect(() => {
  //   selectShop(null);
  // }, []);

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
        setSelectShopList(_shopList);
      } else {
        // console.log("Gql.Shop.getSohpList error = ", result.message);
      }
    }
  }, [data, error]);

  const onMapClickHandle = () => {
    gotoPage("map");
  };

  const handleMenuClick = (index) => {
    setActiveTab(index);
    console.log("คุณคลิกเมนู:", shopCategoryMenuList[index]);
    console.log(categoryList[index]);

    if (categoryList[index] == "none") {
      setSelectShopList(shopList);
    } else {
      const _selectShop = _.filter(shopList, (shop, key) => {
        return shop.category == categoryList[index];
      });

      console.log(_selectShop);
      setSelectShopList(_selectShop);

      //    selectedShopList()
    }
    // const _selectShop = _.pickBy(
    //   shopList,
    //   (shop, key) => shop.category == categoryList[index]
    // );
  };

  return (
    //[10px_1fr_20px] -> 3 rows = [10px, 1fr , 20px]

    <div
      // grid grid-cols-1 h-screen border-2 border-black
      //         grid-rows-[10px_1fr_2fr_10px]
      className={`${geistSans.className} ${geistMono.className}  h-screen  font-[family-name:var(--font-geist-sans)]`}
    >
      {/* <div className="flex flex-col w-full"> */}
      <div
        className="bg-blue-200  p-4 text-xl font-bold 
               flex  border-b border-gray-500 rounded-lg"
      >
        <UserMainPageComponent user={user} />
      </div>
      <div>
        <HorizontalSliderMenu
          menus={shopCategoryMenuList}
          activeTab={activeTab}
          onClickHandle={handleMenuClick}
        />
      </div>

      <div
        className="bg-green-200 mt-1 pt-2 p-1 text-white text-xl font-bold 
               border-b border-gray-500 rounded-lg"
      >
        <div className="grid grid-cols-1 gap-3 flex flex-col mx-auto justify-center md:w-4/5">
          {/* {shopListArray.map((shop) => { */}

          {selectedShopList.map((shop, index) => {
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
