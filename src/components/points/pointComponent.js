"use client";
import Image from "next/image";
import { usePointContext } from "@/context/pointContext";
const PointComponent = () => {
  const { pointData } = usePointContext();
  return (
    <div className="flex items-center gap-1 pt-4">
      <div className="flex items-center gap-1 rounded-full bg-primary-foreground/20 px-2 py-1.5 lg:px-4 lg:py-2">
        <div className="relative w-8 h-8">
          <Image
            src="/images/coin.gif"
            alt="Animated GIF"
            fill // 🟢 ใช้ fill แทน width/height
            className="object-contain" // ปรับเป็น object-cover ได้ถ้าอยากให้เต็มกรอบแบบครอป
            unoptimized={true}
          />
        </div>
        <span className="text-md px-4 font-bold lg:text-base">
          {pointData.tokens}
        </span>
        <span className="text-xs text-primary-foreground/70">tokens</span>
      </div>
    </div>
  );
};

export default PointComponent;
