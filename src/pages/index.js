"user client";
import liff from "@line/liff";
import _ from "lodash";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import MainComponent from "@/components/pages/main";
import ScanQRComponent from "@/components/pages/scanqr";
import MapComponent from "@/components/pages/map";
import RegisterPageComponent from "@/components/pages/register";
import HistoryPageComponent from "@/components/pages/history";
import CircularWaitingComponent from "@/components/waiting/circular";
import ErrorPageComponent from "@/components/pages/errorPage";
import BottomNav from "@/components/nav/bottomNav";
import { useUserContext } from "@/context/userContext";
import { usePointContext } from "@/context/pointContext";
import { callApiLog } from "@/tools/apiLog";
import {
  Home as HomeIcon,
  ScanLine,
  History,
  MapPin,
  User as UserIcon,
} from "lucide-react";
import { GET_USER_INFO } from "@/store/graphql/user";
import { useLazyQuery } from "@apollo/client/react";

export default function Home() {
  const [page, setPage] = useState("loading");
  const [activeTab, setActivTab] = useState("home");
  const [currentPage, setCurrentPage] = useState("register");
  const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [lineId, setLineId] = useState();
  const [lineName, setLineName] = useState();
  // const [idToken]
  const { user, setUser, setLiffObject, lineToken, setLineToken, liffObject } =
    useUserContext();

  const { setPointData } = usePointContext();

  const [doGetUserInfo, { data, errors }] = useLazyQuery(GET_USER_INFO);
  const navItems = [
    { name: "Home", icon: HomeIcon, page: "main" },
    { name: "Map", icon: MapPin, page: "map" },
    { name: "Scan", icon: ScanLine, page: "scanQR" },
    { name: "History", icon: History, page: "history" },
    //{ name: "Profile", icon: UserIcon, page: "" },
  ];

  useEffect(() => {
    const getLiff = async () => {
      // await callApiLog("Home -> useEffect -> getLiff()");
      const myLiffId = process.env.NEXT_PUBLIC_LIFF_ID;

      if (!myLiffId) {
        callApiLog(
          "LIFF ID is undefined. กรุณาเช็คไฟล์ .env.local หรือการตั้งค่า Environment Variables",
        );
        return;
      }
      try {
        await liff.init({ liffId: myLiffId });
        // await callApiLog("Home -> useEffect -> after liffInit()");
        // console.log("l_id = ", process.env.NEXT_PUBLIC_LIFF_ID);
        await callApiLog("Liff ID = " + myLiffId);

        await liff.ready;

        if (!liff.isLoggedIn()) {
          liff.login();
        }
        // await callApiLog("Home => 98 => liff = " + JSON.stringify(liff));

        if (!_.isEmpty(liff)) {
          await callApiLog("Home => 100 => liff Completed");
          const idToken = liff.getIDToken();

          if (!_.isEmpty(idToken)) {
            setLiffObject(liff);
            // setLineToken(idToken);
            //await callApiLog("Home => 101  => ID Token 1 = " + idToken);
            let _user = await getUserInfo(idToken);
            // await callApiLog(
            //   "Home -> useEffect 148 -> call getUserProfile -> user = " +
            //     JSON.stringify(_user),
            // );
            if (_user.lineName) {
              setUser(_user);
              let _points = {
                silverStars: _user.silverStars,
                goldStars: _user.goldStars,
                tokens: _user.tokens,
              };

              setPointData(_points);

              // await callApiLog(
              //   "Home -> useEffect 151 -> call getUserProfile -> goto Main page"
              // );
              gotoPage("main");
            } else {
              // await callApiLog(
              //   "Home -> useEffect 152 -> call getUserProfile -> user is empty"
              // );

              gotoPage("register");
            }
          }
        }

        //   // setLoading(false);
      } catch (error) {
        // await callApiLog("Liff ERROR = " + JSON.stringify(error.message));

        await callApiLog("Liff ERROR = " + JSON.stringify(error.message));
        gotoPage("error");
      }
      ////// PLEASE DELETE ////////////
      // let _lineId = "123";
      // setLineId("123"); // <-- fixed shopId for test  not need line access
      // setLineName("chaiy"); // <-- fixed shopId for test  not need line access
      // setLoading(false);
      // let _userInfo = await getUserInFo(_lineId);
      // if (_userInfo) {
      //   setUser(_userInfo);
      //   gotoPage("main");
      // }
      // console.log("after getuserInfo ", _userInfo);
      ///////////////////////////////////
    };

    if (typeof window !== "undefined") {
      if (_.isEmpty(lineToken) || _.isEmpty(liffObject)) {
        //  initLiff(); // Ensure this runs only in the browser
        // ------------------------------------------//
        // https://narongdej.dev/blog/th/2024/04/04/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B9%81%E0%B8%81%E0%B9%89-type-error-failed-to-fetch-%E0%B9%83%E0%B8%99-line-liff-android//
        //---------------------------------------------//
        const originalFetch = window.fetch;
        function customFetch(url, options) {
          const urlString = url.toString();

          if (
            urlString.startsWith("https://liffsdk.line-scdn.net/xlt/") &&
            urlString.endsWith(".json")
          ) {
            url = urlString + "?ts=" + Math.random();
          }

          return originalFetch(url, options);
        }

        window.fetch = customFetch;
        // ------------------------------------------//
        getLiff();
      }
      // setLoading(false);
    }
  }, []);

  const getUserInfo = async (lineToken) => {
    // console.log("Index -> getusesrInfo() -> lineToken = ", lineToken);
    // await callApiLog("Index 132 -> getusesrInfo() -> lineToken = " + lineToken);
    let _result = await doGetUserInfo({
      variables: { lineToken: lineToken },
    });

    // await callApiLog("getUserResult " + JSON.stringify(_result));
    let result = _result.data.getUserInfo.result;
    let _user = _result.data.getUserInfo.items;

    if (!errors && result?.success) {
      // await callApiLog("getUserInfo Successed " + JSON.stringify(_user));

      return _user;
    }
  };

  const gotoPage = (goto) => {
    console.log(goto);
    setPage(goto);
    setCurrentPage(goto);
    // setLoading(false);
  };

  const PageComponent = () => {
    if (page == "loading") {
      // console.log(loading);
      return <CircularWaitingComponent />;
    }

    if (page == "register") {
      return (
        <RegisterPageComponent
          gotoPage={(page) => {
            gotoPage(page);
          }}
        />
      );
    }

    if (page == "main") {
      return (
        <MainComponent
          // token={lineToken}
          gotoPage={(page) => {
            gotoPage(page);
          }}
        />
      );
    }
    if (page == "scanQR") {
      return (
        <ScanQRComponent
          gotoPage={(page) => {
            gotoPage(page);
          }}
        />
      );
    }
    if (page == "history") {
      return (
        <HistoryPageComponent
          gotoPage={(page) => {
            gotoPage(page);
          }}
        />
      );
    }
    if (page == "map") {
      return (
        <MapComponent
          gotoPage={(page) => {
            gotoPage(page);
          }}
        />
      );
    }
    if (page == "error") {
      return (
        <ErrorPageComponent
          gotoPage={(page) => {
            gotoPage(page);
          }}
        />
      );
    }

    return <div> Page not found</div>;
  };

  return (
    <div className="flex min-h-dvh bg-background">
      <div className="flex-1  min-w-0  lg:ml-64">
        <div className="h-dvh overflow-y-auto">
          <PageComponent />
        </div>
      </div>
      <BottomNav activeTab={activeTab} onTabChange={gotoPage} />
    </div>
  );
}
