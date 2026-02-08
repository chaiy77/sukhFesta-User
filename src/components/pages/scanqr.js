import { useEffect, useState, useRef } from "react";
import { callApiLog } from "@/tools/apiLog";
// import liff from "@line/liff";
import { usePointContext } from "@/context/pointContext";
import CircularWaitingComponent from "@/components/waiting/circular";
import AlertSuccess from "@/components/alert/alertSuccess";
import AlertError from "@/components/alert/alertError";
import { useMutation } from "@apollo/client/react";
import { CHEX_POINT } from "@/store/graphql/user";
import { useUserContext } from "@/context/userContext";

export default function ScanQRComponent({ gotoPage }) {
  // const [liffObject, setLiffObject] = useState();
  const [qrData, setQrData] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [qrError, setQrError] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const isScanning = useRef(false);
  const newPointItem = useRef(null);

  const { liffObject, user } = useUserContext();
  const { setPointData } = usePointContext();

  const [doChexIn, { loading, error, data }] = useMutation(CHEX_POINT);

  useEffect(() => {
    const initLiffAndScan = async () => {
      // callApiLog("start scan " + isScanning.current.toString());
      if (isScanning.current) return;
      try {
        isScanning.current = true;
        setProcessing(true);
        const result = await liffObject.scanCodeV2();
        // await callApiLog(
        //   "scan QR -> 41 -> scan result= " + JSON.stringify(result)
        // );
        if (result.value) {
          setProcessing(false);
          await handleQRCodedata(result.value);
        } else {
          setProcessing(false);
          gotoPage("main");
        }
      } catch (error) {
        setProcessing(false);
        if (
          error.message.includes("permission") ||
          error.code === "FORBIDDEN"
        ) {
        } else if (
          error.message === "User cancelled the operation." ||
          error.code === "USER_CANCELLED"
        ) {
          gotoPage("main");
        } else {
          gotoPage("main");
        }
      }
    };
    if (!_.isEmpty(liffObject)) {
      // callApiLog("InitLifAndScan");
      initLiffAndScan();
    }
  }, [liffObject]);

  const handleQRCodedata = async (data) => {
    if (data) {
      // setQrData(data);
      try {
        await callApiLog("Do ChexIn");
        let _result = await doChexIn({
          variables: { userId: user.id, shopId: data },
        });
        await callApiLog("ChexIn result =" + JSON.stringify(_result));

        if (!_result?.data?.chexPoint.result.success) {
          // alert(_result?.data?.chexPoint.result.message);
          // gotoPage("main");
          // return;
          // await callApiLog("ChexIn result =" + JSON.stringify(_result));
          // callApiLog("Chexin Failed ");
          setProcessing(false);
          setAlertMessage(_result?.data?.chexPoint.result.message);
          setShowErrorAlert(true);
          setShowSuccessAlert(false);
        } else {
          let _item = _result.data.chexPoint.item;
          newPointItem.current = _item;
          // await callApiLog("user item=" + JSON.stringify(_item));

          // alert("ChexIn Completed!");
          // gotoPage("main");
          // return;
          setProcessing(false);
          setAlertMessage("คุณได้รับ 1 token");
          setShowSuccessAlert(true);
          setShowErrorAlert(false);
        }
      } catch (e) {
        // await callApiLog("ChexIn Error = " + JSON.stringify(e));
        // gotoPage("main");
        // return;
        setProcessing(false);
        setAlertMessage("มีบางอย่างผิดพลาด");
        setShowErrorAlert(true);
        setShowSuccessAlert(false);
      }
    }
  };

  const alertClickHandle = () => {
    if (newPointItem.current) {
      setPointData(newPointItem.current);
    }
    setAlertMessage("");
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
    gotoPage("main");
  };

  const QrMeessage = () => {
    if (processing) {
      return <CircularWaitingComponent />;
    }

    if (showSuccessAlert && !showErrorAlert) {
      return (
        <AlertSuccess
          title="Sukho-Token"
          message={alertMessage}
          onClick={alertClickHandle}
        />
      );
    }
    if (!showSuccessAlert && showErrorAlert) {
      return (
        <AlertError
          title="Sukho-Token"
          message={alertMessage}
          onClick={alertClickHandle}
        />
      );
    }
    return <CircularWaitingComponent />;
  };
  return (
    <div
      className={`   items-center justify-items-center min-h-screen  py-10 sm:py-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="flex w-full z-99 items-center sm:items-start md:items-start">
        <QrMeessage />
      </div>
    </div>
  );
}

// if ((qrData || qrError) && !processing) {
//   return (
//     <div
//       className={`  grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
//     >
//       <main className="flex flex-col gap-[32px] z-99 row-start-2 items-center sm:items-start md:items-start">
//         <QrMeessage />
//       </main>
//       <footer className="row-start-3 z-99 w-full flex gap-[24px] flex-wrap items-center justify-center">
//         <div className="flex w-full items-center justify-center">
//           {" "}
//           <button
//             type="button"
//             className=" w-11/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//             onClick={() => {
//               gotoPage("main");
//             }}
//           >
//             Back to Home
//           </button>
//         </div>
//       </footer>
//     </div>
//   );
// }
//    else {
//     return <CircularWaitingComponent />;
//   }
// }
