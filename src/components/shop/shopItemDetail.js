"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

import { MapPin, Store, Phone, Clock } from "lucide-react";

export default function ShopItemDetailComponent({ shop, selectedShop }) {
  // const shop = {};
  const isExpanded = selectedShop
    ? selectedShop.shopName.en == shop.shopName.en
    : false;
  const categoryColors = {
    restaurant: "bg-orange-100 text-orange-700 border-orange-200",
    cafe: "bg-amber-100 text-amber-700 border-amber-200",
    retail: "bg-blue-100 text-blue-700 border-blue-200",
    entertainment: "bg-purple-100 text-purple-700 border-purple-200",
    service: "bg-green-100 text-green-700 border-green-200",
  };

  const openGoogleMapHandle = (lat, lng) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    // สำคัญมาก: ต้องใช้ external: true เพื่อให้ LINE ยอมปล่อยให้ OS เปิดแอปภายนอก
    console.log(url);
    liff.openWindow({
      url: url,
      external: true,
    });
  };
  return (
    <Card
      key={shop.id}
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
    >
      <CardContent className="p-2 sm:p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="flex items-start justify-center gap-3 px-4">
                {shop.imageURL ? (
                  <div className="w-20 h-20 sm:w-40 sm:h-40 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                      src={shop.imageURL}
                      alt={shop.shopName.en}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 sm:w-40 sm:h-40 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                    <Store className="w-8 h-8 text-indigo-600" />
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full">
                <div className="text-gray-900 text-md sm:text-lg  mb-1 pr-4">
                  {shop.shopName ? (
                    <div>{shop.shopName.th}</div>
                  ) : (
                    <div>shop name</div>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {shop.category ? (
                    <div>{shop.category}</div>
                  ) : (
                    <div> category </div>
                  )}
                </div>

                <div className="flex flex-col">
                  {shop?.location?.latitude && shop?.location?.longitude ? (
                    <div>
                      <div className="flex flex-row items-center">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                        <div className="text-[8px]  px-2 sm:p-4 sm:text-sm text-gray-600">
                          {shop.location.latitude} ,{" "}
                          {shop.location.longitude}{" "}
                        </div>
                      </div>

                      <div
                        className="text-[8px] px-4 italic  sm:text-sm text-blue-600"
                        onClick={() =>
                          openGoogleMapHandle(
                            shop.location.latitude,
                            shop.location.longitude,
                          )
                        }
                      >
                        ... open googlemap
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                      <div className="text-[8px] p-2 sm:p-4 sm:text-sm text-gray-600">
                        {" "}
                        00.00,00.00
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              {/* Details */}
              <div className="mx-4 space-y-2">
                <div className="flex flex-row items-center gap-2  mt-2 text-sm sm:text-md text-gray-600">
                  <div>{shop.address.th}</div>
                  <div>ต.{shop.tambol.th}</div>
                  <div>อ.{shop.amphur.th}</div>
                  <div>จ.{shop.province.th}</div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  {shop.telephone ? (
                    <div>{shop.telephone}</div>
                  ) : (
                    <div>xxx-xxxxxxx </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  OPEN/CLOSE
                </div>
              </div>{" "}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? "max-h-[1000px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
