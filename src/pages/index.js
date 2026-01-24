"user client";
import liff from "@line/liff";
import _ from "lodash";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import MainComponent from "@/components/pages/main";
import ScanQRComponent from "@/components/pages/scanqr";
import MapComponent from "@/components/pages/map";
import RegisterPageComponent from "@/components/pages/register";
import CircularWaitingComponent from "@/components/waiting/circular";
import ErrorPageComponent from "@/components/pages/errorPage";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [page, setPage] = useState("loading");
  const [currentPage, setCurrentPage] = useState("register");
  const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [lineId, setLineId] = useState();
  const [lineName, setLineName] = useState();
  // const [idToken]
  const { user, setUser, setLiffObject, lineToken, setLineToken, liffObject } =
    useUserContext();

  const { setPointDataList } = usePointContext();

  const [doGetUserInfo, { data, errors }] = useLazyQuery(GET_USER_INFO);
  const navItems = [
    { name: "Home", icon: HomeIcon, page: "main" },
    { name: "Map", icon: MapPin, page: "map" },
    { name: "Scan", icon: ScanLine, page: "scanQR" },
    { name: "History", icon: History, page: "" },
    { name: "Profile", icon: UserIcon, page: "" },
  ];

  useEffect(() => {
    const getLiff = async () => {
      // await callApiLog("Home -> useEffect -> getLiff()");
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID });
        // await callApiLog("Home -> useEffect -> after liffInit()");
        console.log("l_id = ", process.env.NEXT_PUBLIC_LIFF_ID);
        await liff.ready;
        if (!liff.isLoggedIn()) {
          liff.login();
        }

        // await callApiLog("Home => 98 => liff = " + JSON.stringify(liff));
        if (!_.isEmpty(liff)) {
          // await callApiLog("Home => 100 => liff Completed");
          const idToken = liff.getIDToken();
          // await callApiLog("Home => 101  => ID Token 1 = " + idToken);
          if (!_.isEmpty(idToken)) {
            console.log(token);
            setLiffObject(liff);
            setLineToken(idToken);

            let _user = await getUserInfo(idToken);
            // await callApiLog(
            //   "Home -> useEffect 148 -> call getUserProfile -> user = " +
            //     JSON.stringify(_user)
            // );
            if (_user.lineName) {
              setUser(_user);
              let _pointList = {
                silverStars: _user.silverStars,
                goldStars: _user.goldStars,
              };

              setPointDataList(_pointList);
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
    // 'getUserResult {"data":{"getUserInfo":
    // {"__typename":"UserInfoResult",
    // "result":{"__typename":"Result","success":true,"message":null},
    // "items":{"__typename":"User","lineName":"chaiy","registerDate":1760542384927,"address":null,"tambol":null,"distric":null,"province":null,"zipcode":null,"silverStars":[],"goldStars":[]}}}}'
    // await callApiLog("getUserResult " + JSON.stringify(_result));
    let result = _result.data.getUserInfo.result;
    let _user = _result.data.getUserInfo.items;

    if (!errors && result?.success) {
      // await callApiLog("getUserInfo Successed " + JSON.stringify(_user));
      return _user;
    }
  };

  const gotoPage = (goto) => {
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
    <div>
      <PageComponent />
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-99">
        <div className="max-w-7xl mx-auto px-2">
          <div className="grid grid-cols-5 gap-1 py-2">
            {navItems.map((item, index) => {
              const isActive = true;
              return (
                <div
                  key={index}
                  onClick={() => {
                    let _page = item.page;
                    // console.log(_page);
                    if (currentPage != _page && _page != "") {
                      // console.log("goto page ", _page);
                      gotoPage(_page);
                    }
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
