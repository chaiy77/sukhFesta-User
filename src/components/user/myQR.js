"use client";
import { useState, useRef } from "react";
import { useSubscription } from "@apollo/client/react";
import QrCodeGenerator from "../qrcode/qrGenerator";
import { useUserContext } from "@/context/userContext";
import { usePointContext } from "@/context/pointContext";
import { ON_REDEEM_SUBSCRIPTION } from "@/store/graphql/user";
import AlertSuccess from "@/components/alert/alertSuccess";
import AlertError from "@/components/alert/alertError";
import { callApiLog } from "@/tools/apiLog";

const MyQRComponent = ({ setCurrentSlide }) => {
  const { user } = useUserContext();
  const { setPointData } = usePointContext();

  const [hasRedeemResponse, setRedeemResponse] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const alertMessage = useRef("");
  const newTokens = useRef(0);

  const { data, loading, error } = useSubscription(ON_REDEEM_SUBSCRIPTION, {
    variables: { userId: user.id },
    onData: ({ data }) => {
      //callApiLog("subscription REDEEM data = " + JSON.stringify(data));
      let result = data.data.onUserRedeem.result;
      if (result.success) {
        const reward = data.data.onUserRedeem.reward;
        const item = data.data.onUserRedeem.item;
        //callApiLog("subscription REDEEM item= " + JSON.stringify(item));
        alertMessage.current = reward;
        newTokens.current = item;
        setShowSuccessAlert(true);
        setShowErrorAlert(false);
        setRedeemResponse(true);
      } else {
        const message = result.errorCode + ": " + result.message;
        alertMessage.current = message;
        setShowSuccessAlert(false);
        setShowErrorAlert(true);
        setRedeemResponse(true);
      }
    },
  });

  const QRCodeCompoent = () => {
    return <QrCodeGenerator qrData={user.id} />;
  };

  const alertClickHandle = () => {
    setPointData(newTokens.current);
    alertMessage.current = "";
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
    setCurrentSlide(0);
  };

  const RedeemResponseComponent = () => {
    if (hasRedeemResponse) {
      if (showSuccessAlert && !showErrorAlert) {
        return (
          <AlertSuccess
            title="Sukho-Token"
            message={alertMessage.current}
            onClick={alertClickHandle}
          />
        );
      }
      if (!showSuccessAlert && showErrorAlert) {
        return (
          <AlertError
            title="Sukho-Token"
            message={alertMessage.current}
            onClick={alertClickHandle}
          />
        );
      }
    } else {
      return (
        <div>
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
    }
  };

  return (
    <div className="flex flex-col  items-center gap-2">
      <RedeemResponseComponent />
    </div>
  );
};

export default MyQRComponent;
