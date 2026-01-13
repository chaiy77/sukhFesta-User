import { useEffect, useState } from "react";
import { callApiLog } from "@/tools/apiLog";
// import liff from "@line/liff";
import { usePointContext } from "@/context/pointContext";
import CircularWaitingComponent from "@/components/waiting/circular";
import { useMutation } from "@apollo/client/react";
import { CHEX_POINT } from "@/store/graphql/user";
import { useUserContext } from "@/context/userContext";

export default function ScanQRComponent({ gotoPage }) {
  // const [liffObject, setLiffObject] = useState();
  const [qrData, setQrData] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [qrError, setQrError] = useState(null);
  const { liffObject, user, lineToken } = useUserContext();
  const { setPointDataList } = usePointContext();

  const [doChexIn, { loading, error, data }] = useMutation(CHEX_POINT);

  // useEffect(() => {
  //   const initLiff = async () => {
  //     try {
  //       await liff.init({ liffId: process.env.LIFF_ID }); // replace with your LIFF ID
  //       await liff.ready;
  //       callApiLog(JSON.stringify(liff));
  //       if (!liff.isLoggedIn()) {
  //         liff.login();
  //       }

  //       if (!liff.isInClient()) {
  //         // setError('กรุณาเปิดผ่านแอป LINE เท่านั้นเพื่อสแกน QR Code')
  //         callApiLog("กรุณาเปิดผ่านแอป LINE เท่านั้นเพื่อสแกน QR Code");
  //         return;
  //       }

  //       setLiffObject(liff);
  //     } catch (err) {
  //       callApiLog("กรุณาเปิดผ่านแอป LINE เท่านั้นเพื่อสแกน QR Code");
  //     }
  //   };
  //   initLiff();
  // }, []);

  useEffect(() => {
    // callApiLog("ScanQRPage => useEffect => liffObject");
    // callApiLog(JSON.stringify(liffObject));
    // callApiLog("lineToken = " + lineToken);
    const initLiffAndScan = async () => {
      try {
        setProcessing(true);
        // await callApiLog("ScanQRPage => useEffect => Start Scan");
        const result = await liffObject.scanCodeV2();

        // await callApiLog(
        //   "scan QR -> 41 -> scan result= " + JSON.stringify(result)
        // );
        if (result.value) {
          setProcessing(false);
          await handleQRCodedata(result.value);
        } else {
          // await callApiLog(
          //   "scan QR -> 41 -> scan result= Can not get qr value"
          // );
          setQrError("Can not detect QR Code");
        }
      } catch (err) {
        // await callApiLog("Scan failed:", err);
        // await callApiLog("กรุณาเปิดผ่านแอป LINE เท่านั้นเพื่อสแกน QR Code");
        setProcessing(false);
        if (
          error.message === "User cancelled the operation." ||
          error.code === "USER_CANCELLED"
        ) {
          gotoPage(main);
        } else {
          alert("Can not open camera: " + error.message);
        }
      }
    };
    if (!_.isEmpty(liffObject) && !processing) {
      initLiffAndScan();
    }
  }, []);

  const handleQRCodedata = async (data) => {
    if (data) {
      setQrData(data);
      // await callApiLog("ScanQR data =" + data);
      // await callApiLog("ScanQR lineToken  =" + lineToken);
      try {
        // await callApiLog("Do ChexIn");
        let _result = await doChexIn({
          variables: { lineToken: lineToken, shopId: data },
        });
        // callApiLog("ChexIn result =" + JSON.stringify(_result));

        if (!_result?.data?.chexPoint.result.success) {
          alert(_result?.data?.chexPoint.result.message);
          gotoPage("main");
          return;
        }
        if (_result?.data?.chexPoint) {
          let _item = _result.data.chexPoint.item;
          setPointDataList(_item);
          alert("ChexIn Completed!");
          gotoPage("main");
          return;
        }
      } catch (e) {
        // await callApiLog("ChexIn Error = " + JSON.stringify(e));
      }
      //let dataPointName = data.replace(/\s/g, "").toLowerCase();

      // for (let i = 0; i < dummyPointList.length; i++) {
      //   let pointName = dummyPointList[i]["nameEN"]
      //     .replace(/\s/g, "")
      //     .toLowerCase();

      //   if (dataPointName === pointName) {
      //     callApiLog(
      //       "SCAN QR -> 64 -> add Point -> " + JSON.stringify(dataPointName)
      //     );
      //     addPointToMyList(dummyPointList[i]);
      //   }
      // }
    }
  };

  const QrMeessage = () => {
    if (qrError) {
      return <div> Error = {qrError} </div>;
    } else if (qrData) {
      return <div> QR Message {qrData} </div>;
    }
    return <div></div>;
  };

  if ((qrData || qrError) && !processing) {
    return (
      <div
        className={`  grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <main className="flex flex-col gap-[32px] z-99 row-start-2 items-center sm:items-start md:items-start">
          <QrMeessage />
        </main>
        <footer className="row-start-3 z-99 w-full flex gap-[24px] flex-wrap items-center justify-center">
          <div className="flex w-full items-center justify-center">
            {" "}
            <button
              type="button"
              className=" w-11/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                gotoPage("main");
              }}
            >
              Back to Home
            </button>
          </div>
        </footer>
      </div>
    );
  } else {
    return <CircularWaitingComponent />;
  }
}
