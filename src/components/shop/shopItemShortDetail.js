"use client";
import Image from "next/image";
import { dummyMyPoint } from "@/tools/dummyData";
import { usePointContext } from "@/context/pointContext";
import { useShopContext } from "@/context/shopContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ScanLine,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowRight,
  MapPin,
  Store,
  Coins,
  Phone,
  Clock,
  MapPinned,
  Navigation,
} from "lucide-react";

export default function ShopItemShortDetailComponent({ shop, onMapClick }) {
  const { selectShop } = useShopContext();

  return (
    // <Link key={shop.id} to={""}>
    <div>
      <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
        <CardContent className="p-2 sm:p-4">
          <div className="flex gap-2">
            {shop.imageURL ? (
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src={shop.imageURL}
                  alt={shop.shopName.en}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                <Store className="w-8 h-8 text-indigo-600" />
              </div>
            )}

            <div className="flex-1 pl-2 sm:pl-4 min-w-0">
              <div className="flex flex-row items-end justify-between">
                <div className=" text-[16px] sm:text-xl font-bold text-gray-900 mb-1 truncate">
                  {shop.shopName ? (
                    <div>{shop.shopName.th}</div>
                  ) : (
                    <div>shop name</div>
                  )}
                </div>

                <span className="inline-block item-center mx-4 px-2 py-0.5  text-indigo-700 text-xs  mb-2">
                  {shop.category ? (
                    <div>{shop.category}</div>
                  ) : (
                    <div> category </div>
                  )}
                </span>
              </div>
              <div className="flex flex-row items-center py-1  text-[10px]  sm:text-md text-gray-600">
                <div>{shop.address.th}</div>
                <div>ต.{shop.tambol.th}</div>
                <div>อ.{shop.amphur.th}</div>
                <div>จ.{shop.province.th}</div>
                {/*                 
                  {shop.address ? (
                    <div>{shop.address.th}</div>
                  ) : (
                    <div>address </div>
                  )} */}
              </div>

              <div className="flex items-center text-[10px] gap-2 sm:text-md text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                {shop.telephone ? (
                  <div>{shop.telephone}</div>
                ) : (
                  <div>xxx-xxxxxxx </div>
                )}
              </div>
              {/* <span className="inline-block item-center px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full  */}

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div>reward </div>
                {shop.reward ? <div>{shop.reward}</div> : <div> - </div>}
              </div>

              <div className="inline-block   items-start gap-1 text-xs  px-2 py-0.5 bg-indigo-100 text-indigo-700  rounded-full  ">
                <div
                  className="flex flex-row"
                  onClick={() => {
                    selectShop(shop);
                    onMapClick();
                  }}
                >
                  <MapPinned className="w-3 h-3 mt-0.5 flex-shrink-0  mx-2" />
                  <span> map...</span>{" "}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    // </Link>
  );
}
