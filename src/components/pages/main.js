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
    if (data) {
      let result = data?.getShopList?.result;

      if (result.success) {
        let _shopList = data?.getShopList.items;

        setShopList(_shopList);
        setSelectShopList(_shopList);
      } else {
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
      <div className="mt-3 grid grid-cols-1 gap-2 px-1 sm:px-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 lg:px-8">
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
  );
}
