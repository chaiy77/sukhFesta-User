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
  const categoryColors = {
    restaurant: "bg-orange-100 text-orange-700 border-orange-200",
    cafe: "bg-amber-100 text-amber-700 border-amber-200",
    retail: "bg-blue-100 text-blue-700 border-blue-200",
    entertainment: "bg-purple-100 text-purple-700 border-purple-200",
    service: "bg-green-100 text-green-700 border-green-200",
  };

  const { selectShop } = useShopContext();

  return (
    // <Link key={shop.id} to={""}>
    <div>
      <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
        <CardContent className="px-4">
          <div className="flex gap-2">
            {shop.imageURL ? (
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
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

            <div className="flex-1 min-w-0">
              <div className="flex flex-row item-start justify-center">
                <h4 className="font-bold text-gray-900 mb-1 truncate">
                  {shop.shopName ? (
                    <div>{shop.shopName.th}</div>
                  ) : (
                    <div>shop name</div>
                  )}
                </h4>

                <span className="inline-block item-center mx-4 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full mb-2">
                  {shop.category ? (
                    <div>{shop.category}</div>
                  ) : (
                    <div> category </div>
                  )}
                </span>
              </div>
              <div className="flex items-start gap-1 text-xs text-gray-600">
                <Navigation className="w-3 h-3 text-indigo-600" />
                <span className="line-clamp-2">
                  {shop.distance ? (
                    <div>{shop.distance}</div>
                  ) : (
                    <div>00.00 km.</div>
                  )}
                </span>
              </div>

              <div className="flex items-start gap-1 text-xs text-gray-600">
                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">
                  {shop.address ? (
                    <div>{shop.address.th}</div>
                  ) : (
                    <div>address </div>
                  )}
                </span>
              </div>
              {/* <span className="inline-block item-center px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full  */}

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
