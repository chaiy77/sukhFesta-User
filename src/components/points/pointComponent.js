"use client";

import { usePointContext } from "@/context/pointContext";

import { Flame } from "lucide-react";

const PointComponent = () => {
  // const [pointList, setPointList] = useState([]);
  const { pointData } = usePointContext();
  return (
    <div className="flex items-center gap-1 pt-4">
      <div className="flex items-center gap-1 rounded-full bg-primary-foreground/20 px-2 py-1.5 lg:px-4 lg:py-2">
        <Flame className="h-4 w-4 text-accent " />
        <span className="text-md px-4 font-bold lg:text-base">
          {pointData.tokens}
        </span>
        <span className="text-xs text-primary-foreground/70">tokens</span>
      </div>
    </div>
  );
};

export default PointComponent;
