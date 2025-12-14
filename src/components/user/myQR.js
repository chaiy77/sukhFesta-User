"use client";

import QrCodeGenerator from "../qrcode/qrGenerator";

const MyQRComponent = ({ gotoPage, qrCodeData }) => {
  // ShopID For Dev
  // We need to send request to dynamobd via id token
  qrCodeData = "587868ee-e067-4e4b-a982-a6cc9ed60b17";

  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center ">
      <div>
        <h1 className="flex items-center py-8">My QR Code</h1>
        <QrCodeGenerator qrData={qrCodeData} />
      </div>
    </div>
  );
};

export default MyQRComponent;
