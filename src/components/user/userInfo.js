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
      <div className="grid  grid-cols-3 gap-4 text-user-info">
        <div className="col-span-2">
          <div className="grid grid-rows-2 ">
            <div className="sm:text-xl">
              <div className="">{user.lineName}</div>
            </div>
            <div className="flex flex-row w-full mb-1 text-sm sm:text-md">
              <div className="px-2">
                <p> Sukh-tokens</p>
              </div>
              <div className="px-2 ">
                {pointList?.silverStars ? pointList?.silverStars.length : 0}
              </div>
              <div>
                <span className=" ">tokens</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-items-end w-full">
          <div className="flex flex-col  items-center px-4 w-full">
            <div>
              <QrCodeIcon
                className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px]"
                onClick={() => setCurrentSlide(1)}
              />
            </div>
            <div className="items-center text-[10px] sm:text-sm">my QR</div>
          </div>
        </div>

        {/* <div className="flex flex-row w-full">
          <div className="flex flex-col w-5/6">
            <div className="">{user.lineName}</div>
          </div>
          <div className="flex justify-end px-4">
            <QrCodeIcon size={32} onClick={() => setCurrentSlide(1)} />
          </div>
        </div>

        <div className="flex flex-row w-full">
          <div>
            <p className="text-white/80 font-medium mb-2">Sukh-tokens</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h1 className="text-md  font-bold text-white">
              {pointList?.goldStars ? pointList?.goldStars.length : 0}
            </h1>
            <span className=" text-white/80 font-medium">tokens</span>
          </div>
        </div> */}

        {/* Gold Points Card */}
        {/* <Card className="relative overflow-hidden bg-gradient-to-br  from-yellow-400 via-yellow-500 to-amber-600 border-0 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24" />
            <CardContent className="relative p-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-2">
                    Sukh-tokens
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h1 className="text-4xl font-bold text-white">
                      {pointList?.goldStars ? pointList?.goldStars.length : 0}
                    </h1>
                    <span className="text-lg text-white/80 font-medium">
                      tokens
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card> */}
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
              window.location.reload();
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
      <div className="flex flex-col  w-full">
        <UserDetailCompoent />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center w-full">
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
