"use client";

import QrCodeGenerator from "../qrcode/qrGenerator";
import { useUserContext } from "@/context/userContext";

const MyQRComponent = ({ gotoPage }) => {
  // ShopID For Dev
  // We need to send request to dynamobd via id token
  const { lineToken } = useUserContext();

  return (
    <div className="flex flex-col  row-start-2 items-center ">
      <div>
        <h1 className="flex items-center ">My QR Code</h1>
        <QrCodeGenerator qrData={lineToken} />

      </div>
    </div>
  );
};

export default MyQRComponent;
