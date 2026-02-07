"use client";
import { useState, useEffect } from "react";
import { gql, useSubscription, useQuery } from "@apollo/client/react";
import QrCodeGenerator from "../qrcode/qrGenerator";
import { useUserContext } from "@/context/userContext";
import { ON_REDEEM_SUBSCRIPTION } from "@/store/graphql/user";

const MyQRComponent = ({ setCurrentSlide }) => {
  const { user } = useUserContext();

  const { data, loading, error } = useSubscription(ON_REDEEM_SUBSCRIPTION, {
    variables: { userId: user.id },
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("New data received:", subscriptionData.data);
      // คุณสามารถสั่งให้แสดงสติกเกอร์ หรือเสียงแจ้งเตือนตรงนี้ได้
    },
  });

  const QRCodeCompoent = () => {
    return <QrCodeGenerator qrData={user.id} />;
  };

  return (
    <div className="flex flex-col  items-center gap-2">
      <div className="flex-1 text-md ">QR Code</div>
      <QRCodeCompoent />
      <div className="flex-1 w-full my-4">
        <button
          type="button"
          className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            setCurrentSlide(0);
            // window.location.reload();
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MyQRComponent;
