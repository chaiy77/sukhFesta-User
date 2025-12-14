"use client";
import Image from "next/image";
import { dummyMyPoint } from "@/tools/dummyData";
import { usePointContext } from "@/context/pointContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Navigation,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect } from "react";

export default function ShopItemDetailComponent({
  shop,
  onShopClick,
  selectedShop,
}) {
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

  return (
    <Card
      key={shop.id}
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex-1 flex flex-row">
            <div className="flex items-start justify-center gap-3 px-4">
              {shop.imageURL ? (
                <div className="w-40 h-40 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={shop.imageURL}
                    alt={shop.shopName.en}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                  <Store className="w-8 h-8 text-indigo-600" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row pb-4">
                <h4 className="font-bold text-gray-900 text-lg mb-1 pr-4">
                  {shop.shopName ? (
                    <div>{shop.shopName.th}</div>
                  ) : (
                    <div>shop name</div>
                  )}
                </h4>

                <Badge
                  variant=" secondary"
                  className={`${categoryColors[shop.category]} border text-xs`}
                >
                  {shop.category ? (
                    <div>{shop.category}</div>
                  ) : (
                    <div> category </div>
                  )}
                </Badge>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 items-end"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShopClick(shop);
                  }}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-8 h-8 text-indigo-600" />
                  ) : (
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                  )}
                </Button>
              </div>
              <div className="flex items-center gap-1 bg-indigo-50 px-3 py-1 rounded-full">
                <Navigation className="w-3 h-3 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600">
                  {shop.distance ? (
                    <div>{shop.distance}</div>
                  ) : (
                    <div>00.00 km.</div>
                  )}
                </span>
              </div>
              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                  {shop.address ? (
                    <div>{shop.address.th}</div>
                  ) : (
                    <div>address </div>
                  )}
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
              >
                *{/* Description */}
                <div className="pt-space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2 pt-2 border-t">
                    {shop.description ? (
                      <div>{shop.description}</div>
                    ) : (
                      <div>description </div>
                    )}
                  </p>
                </div>
                <div className="pt-4  space-y-4">
                  {/* Description */}
                  {shop.description && (
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Store className="w-4 h-4 text-indigo-600" />
                        About
                      </h5>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // return (
  //   <Card
  //     key={shop.id}
  //     className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
  //     onClick={() => onShopClick(shop)}
  //   >

  //     <CardContent className="p-4">
  //       <div className="space-y-3">
  //         {/* Header */}
  //         <div className="flex items-start justify-between gap-3">
  //           <div className="flex-1">
  //             <h4 className="font-bold text-gray-900 text-lg mb-1">
  //               SHop Name
  //             </h4>
  //             {shop.category &&  (
  //               <Badge
  //                 variant="secondary"
  //                 className={`${categoryColors[shop.category]} border text-xs`}
  //               >
  //                 {/* {shop.category} */}
  //                 Shop Category
  //               </Badge>
  //             )}
  //           </div>
  //           {shop.distance && (
  //             <div className="flex items-center gap-1 bg-indigo-50 px-3 py-1 rounded-full">
  //               <Navigation className="w-3 h-3 text-indigo-600" />
  //               <span className="text-sm font-semibold text-indigo-600">
  //                 {/* {shop.distance} km */}
  //                 0.00 km
  //               </span>
  //             </div>
  //           )}
  //         </div>

  //         {/* Details */}
  //         <div className="space-y-2">
  //           {shop.address && (
  //             <div className="flex items-start gap-2 text-sm text-gray-600">
  //               <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
  //               {/* <span>{shop.address}</span> */}
  //               Shop Address
  //             </div>
  //           )}
  //           {shop.phone && (
  //             <div className="flex items-center gap-2 text-sm text-gray-600">
  //               <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
  //               {/* <span>{shop.phone}</span> */}
  //               shop Phone
  //             </div>
  //           )}
  //           {shop.hours && (
  //             <div className="flex items-center gap-2 text-sm text-gray-600">
  //               <Clock className="w-4 h-4 flex-shrink-0 text-gray-400" />
  //               {/* <span>{shop.hours}</span> */}
  //               OPEN/CLOSE
  //             </div>
  //           )}
  //         </div>

  //         {/* Description */}
  //         {shop.description && (
  //           <p className="text-sm text-gray-600 line-clamp-2 pt-2 border-t">
  //             {/* {shop.description} */}
  //             Shop Description
  //           </p>
  //         )}
  //       </div>
  //     </CardContent>
  //   </Card>
  // );
}
