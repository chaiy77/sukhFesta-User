import React, { useState, useEffect } from "react";
// import { Shop } from "@/entities/Shop";
import { Input } from "@/components/ui/input";
import { Search, Navigation } from "lucide-react";
import ShopItemDetailComponent from "../shop/shopItemDetail";
import { useShopContext } from "@/context/shopContext";
import { dummyMyPoint, shopListArray } from "@/tools/dummyData";

import dynamic from "next/dynamic";

// 1. Dynamically import the MapComponent
// 2. Set ssr: false to prevent it from running on the server
const DynamicMap = dynamic(() => import("../map/mapView"), {
  ssr: false, // THIS IS THE KEY!
  loading: () => <p className="text-gray-500">Map loading...</p>,
});

export default function MapComponent() {
  // let shops = shopListArray;
  // const [selectedShop, setSelectedShop] = useState();
  const { selectedShop, selectShop, shopList } = useShopContext();

  const onShopClick = (shop) => {
    // console.log("onShopClick ", shop);s
    let _shop = selectedShop?.shopName.en == shop.shopName.en ? null : shop;
    selectShop(_shop);
  };

  // useEffect(() => {
  //   if()
  //   console.log("Map => selected shop = ", selectedShop);
  // }, [selectedShop]);
  return (
    <div
      className="grid 
      grid-rows-[10px_minmax(min-content,_500px)_auto] gap-2 min-h-screen "
    >
      {/* Map View */}
      <div
        className="bg-blue-300 p-4 text-white text-xl font-bold 
              row-start-2 flex items-center justify-center border-b border-gray-500"
      >
        <DynamicMap shops={shopList} selectedShop={selectedShop} />
      </div>

      {/*Shop List */}
      <div
        className="bg-blue-300 p-4 text-white text-xl font-bold 
              row-start-3 flex items-center justify-center border-b border-blue-500"
      >
        <div className="grid grid-cols-1 gap-3 flex flex-col mx-auto justify-center md:w-4/5">

          {shopList.map((shop, index) => {
            return (
              <ShopItemDetailComponent
                key={index}

                shop={shop}
                onShopClick={(shop) => onShopClick(shop)}
                selectedShop={selectedShop}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
