"use client";

import { usePointContext } from "@/context/pointContext";

const PointComponent = () => {
  // const [pointList, setPointList] = useState([]);
  const { pointData } = usePointContext();

  return (
    <div className="flex flex-row w-full mb-1 text-sm sm:text-md">
      <div className="px-2">
        <p> Sukh-tokens</p>
      </div>
      <div className="px-2 ">{pointData.tokens || 0}</div>
      <div>
        <span className=" ">tokens</span>
      </div>
    </div>
  );
};

export default PointComponent;
