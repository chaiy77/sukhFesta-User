import _ from "lodash";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import SelectAreaPopover from "../select/areaPopover";
import Image from "next/image";
import { callApiLog } from "@/tools/apiLog";
import UserMainPageComponent from "../user/userInfo";
import ShopItemDetailComponent from "../shop/shopItemDetail";
import ShopItemShortDetailComponent from "../shop/shopItemShortDetail";
import HorizontalSliderMenu from "../sliderMenu/slidermenu";
import { useShopContext } from "@/context/shopContext";
import { useUserContext } from "@/context/userContext";
import { GET_SHOP_LIST } from "@/store/graphql/shop";
import { useQuery } from "@apollo/client/react";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Heart,
  QrCode,
  User,
  Trophy,
  Flame,
  Gift,
  Settings,
  Award,
} from "lucide-react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const shopCategoryMenuList = [
  "ทุกร้าน",
  "ร้านอาหาร/เครื่องดื่ม",
  "โรงแรม/ที่พัก",
  "บริการ",
  "สินค้า",
  "รถเช่า",
];
const categoryList = ["all", "food", "hotel", "service", "consumer", "carrent"];

export default function MainComponent({ gotoPage }) {
  const [point, setPoint] = useState(0);
  const [shopCategory, setShopCategory] = useState("all");
  const [shopArea, setShopArea] = useState("all");
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

  useEffect(() => {
    let _selectShop = shopList;
    if (shopArea || shopCategory) {
      if (shopArea != "all") {
        _selectShop = _.filter(_selectShop, (shop) => {
          return _.get(shop, "amphur.en") === shopArea;
        });
      }
      if (shopCategory != "all") {
        _selectShop = _.filter(_selectShop, (shop) => {
          return shop.category === shopCategory;
        });
      }
    }
    // console.log(_selectShop);
    setSelectShopList(_selectShop);
  }, [shopArea, shopCategory]);

  const onMapClickHandle = () => {
    gotoPage("map");
  };

  const handleMenuClick = (index) => {
    setActiveTab(index);
    setShopCategory(categoryList[index]);
    // console.log("คุณคลิกเมนู:", shopCategoryMenuList[index]);
    // console.log(categoryList[index]);

    // if (categoryList[index] == "none") {
    //   setSelectShopList(shopList);
    // } else {
    //   const _selectShop = _.filter(shopList, (shop, key) => {
    //     return shop.category == categoryList[index];
    //   });

    //   console.log(_selectShop);
    //   setSelectShopList(_selectShop);
    // }
  };
  const handleAreaSelect = (e) => {
    setShopArea(e);
  };

  return (
    <div className="pb-24 lg:pb-8">
      <div className="bg-primary px-5 pb-5 pt-8 text-primary-foreground lg:px-8 lg:pb-6">
        <div className="mx-auto max-w-5xl">
          <UserMainPageComponent user={user} />
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <HorizontalSliderMenu
          menus={shopCategoryMenuList}
          activeTab={activeTab}
          onClickHandle={handleMenuClick}
        />
      </div>
      <div className="z-[99] px-4 w-1/2 items-center ">
        <SelectAreaPopover onSelect={handleAreaSelect} />
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 lg:px-8">
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
    // <div className={`  h-screen  font-[family-name:var(--font-geist-sans)]`}>
    //   <div
    //     className="bg-blue-200  p-4 text-xl font-bold
    //            flex  border-b border-gray-500 rounded-lg"
    //   >
    //     <UserMainPageComponent user={user} />
    //   </div>
    //   <div className="flex flex-col">
    //     <div className="w-full">
    //       <HorizontalSliderMenu
    //         menus={shopCategoryMenuList}
    //         activeTab={activeTab}
    //         onClickHandle={handleMenuClick}
    //       />
    //     </div>
    //     <div className="z-[99] px-4 w-1/2 items-center ">
    //       <SelectAreaPopover onSelect={handleAreaSelect} />
    //     </div>
    //   </div>

    //   <div
    //     className="bg-green-200 mt-1 pt-2 p-1 text-white text-xl font-bold
    //            border-b border-gray-500 rounded-lg"
    //   >
    //     <div className="grid grid-cols-1 gap-3 flex flex-col mx-auto justify-center md:w-4/5">
    //       {selectedShopList.map((shop, index) => {
    //         // console.log(shop);
    //         if (shop.status == "active") {
    //           return (
    //             <div key={index}>
    //               <ShopItemShortDetailComponent
    //                 shop={shop}
    //                 onMapClick={onMapClickHandle}
    //               />
    //             </div>
    //           );
    //         }
    //       })}
    //     </div>
    //   </div>
    // </div>
  );
}
