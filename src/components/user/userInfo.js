"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { callApiLog } from "@/tools/apiLog";
import {
  Coins,
  QrCodeIcon,
  Search,
  Star,
  Clock,
  Heart,
  User,
  Trophy,
  Flame,
  Gift,
  Settings,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MyQRComponent from "@/components/user/myQR";
import PointComponent from "@/components/points/pointComponent";

export default function UserMainPageComponent({ user }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const UserDetailCompoent = () => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex flex-row">
              <User className="h-5 w-5 text-primary-foreground lg:h-6 lg:w-6" />
              <h1 className="text-lg font-bold leading-tight px-4 lg:text-xl">
                Hi, {user.lineName}
              </h1>
            </div>
            <div>
              <PointComponent />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <QrCodeIcon
            className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]"
            onClick={() => setCurrentSlide(1)}
          />
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
      <div className="flex flex-col items-center justify-center w-full ">
        <MyQRComponent setCurrentSlide={() => setCurrentSlide(0)} />
      </div>
    );
  }
}
