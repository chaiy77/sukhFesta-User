"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { callApiLog } from "@/tools/apiLog";
import { usePointContext } from "@/context/pointContext";
import {
  ScanLine,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowRight,
  MapPin,
  Store,
  Coins,
  QrCodeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MyQRComponent from "@/components/user/myQR";

export default function UserMainPageComponent({ user }) {
  const [pointList, setPointList] = useState([]);
  const { pointDataList } = usePointContext();

  //--- for slide component
  const [currentSlide, setCurrentSlide] = useState(0);
  // The style object applies the horizontal movement
  // If currentSlide is 1, it moves the whole track by -100%

  //--- for slide component

  useEffect(() => {
    // callApiLog(
    //   "userInfo => useEffect => pointDataList = " +
    //     JSON.stringify(pointDataList)
    // );
    setPointList(pointDataList);
  }, [pointDataList]);

  const UserDetailCompoent = () => {
    return (
      <div className="grid grid-rows-[1fr_3fr] gap-2">
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-5/6">
            <div className="">{user.lineName}</div>
          </div>
          <div className="flex justify-end px-4">
            <QrCodeIcon size={32} onClick={() => setCurrentSlide(1)} />
          </div>
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-4 flex w-full">
          <Card className="flex w-full relative overflow-hidden bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 border-0 shadow-xl">
            {/* <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24" /> */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-12 -translate-x-12" />

            <CardContent className="relative p-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-2">
                    Silver Points
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h1 className="text-4xl font-bold text-white">
                      {pointList?.silverStars
                        ? pointList?.silverStars.length
                        : 0}
                    </h1>
                    <span className="text-lg text-white/80 font-medium">
                      pts
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Coins className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gold Points Card */}
          <Card className="relative overflow-hidden bg-gradient-to-br  from-yellow-400 via-yellow-500 to-amber-600 border-0 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24" />
            {/* <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-12 -translate-x-12" /> */}

            <CardContent className="relative p-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-2">
                    Gold Points
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h1 className="text-4xl font-bold text-white">
                      {pointList?.goldStars ? pointList?.goldStars.length : 0}
                    </h1>
                    <span className="text-lg text-white/80 font-medium">
                      pts
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const UserQRComponent = () => {
    return (
      <div className="flex flex-col w-full items-center gap-2">
        <div className="flex px-4">
          <MyQRComponent />
        </div>
        <div className="flex  my-4">
          <button
            type="button"
            className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              setCurrentSlide(0);
            }}
          >
            Back
          </button>
        </div>
      </div>
    );
  };

  if (currentSlide == 0) {
    return (
      <div className="flex flex-col item-center justify-center w-full">
        <UserDetailCompoent />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col item-center justify-center w-full">
        <UserQRComponent />
      </div>
    );
  }

  // <div className="overflow-hidden w-full">
  //   {/* The slides container */}
  //   <div
  //     className="flex transition-transform duration-500 ease-in-out"
  //     style={trackStyle}
  //   >
  //     <div className="w-full flex-shrink-0 ">
  //       {" "}
  //       <div className="flex flex-col item-center justify-center w-full">
  //         <UserDetailCompoent />
  //       </div>
  //     </div>
  //     {/* <div className="w-full flex-shrink-0 ">
  //       <div className="flex flex-col item-center justify-center w-full">
  //         <UserQRComponent />
  //       </div>
  //     </div> */}
  //   </div>

  //   {/* Navigation buttons would call setCurrentSlide(...) */}
  // </div>

  // <div className="grid grid-rows-[3fr_1fr] w-full">
  //   <div className="grid grid-cols-[2fr_4fr]">
  //     <div
  //       class="bg-blue-200  text-white text-xl font-bold
  //            flex items-center justify-center border-b border-gray-500"
  //     >
  //       Image
  //     </div>
  //     <div
  //       class="bg-blue-400 text-white text-xl font-bold
  //            flex items-center justify-center border-b border-gray-500"
  //     >
  //       Name
  //     </div>
  //   </div>
  //   <div
  //     class="bg-blue-500 text-white text-xl font-bold
  //            flex items-center justify-center border-b border-gray-500"
  //   >
  //     Star
  //   </div>
  // </div>
  // );
}
