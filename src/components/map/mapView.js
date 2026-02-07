import React, { use, useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  MapPin,
} from "react-leaflet";
import { Store, Navigation } from "lucide-react";
import { CurrentLocation } from "@/components/user/userLocation";
import { callApiLog } from "@/tools/apiLog";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom shop marker icon
const shopIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const userIcon = () => {
  callApiLog("mapView -> 51 -> user");
  const iconHTML = renderToStaticMarkup(
    <div className="flex items-center justify-center">
      {/* ใส่ drop-shadow เพื่อให้ไอคอนดูมีมิติบนแผนที่ */}
      <MapPin
        size={16}
        fill="#f63b3bff"
        className="text-white drop-shadow-md"
      />
    </div>
  );

  callApiLog("mapView -> 51 -> userIcon = " + iconHTML.toString());

  return L.divIcon({
    html: iconHTML,
    className: "custom-marker",
    iconSize: [16, 16],
    iconAnchor: [8, 8], // ให้จุดปักหมุดอยู่ที่ปลายแหลมของไอคอนพอดี
    // popupAnchor: [0, -32], // ให้ Popup เด้งเหนือไอคอน
  });
};

// User location marker icon
// const userIcon = new L.DivIcon({
//   className: "custom-marker",
//   // html: `<div style="background: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
//   html: `<div style={{ color: #f63b3bff }}>
//       <MapPin size={32} fill="white" />
//     </div>`,
//   iconSize: [16, 16],
//   iconAnchor: [8, 8],
// });

function MapUpdater({ center }) {
  const map = useMap();
  if (typeof window === "undefined") return null;
  useEffect(() => {
    callApiLog("mapUpdater -> center = " + JSON.stringify(center));
    if (center) {
      map.setView(center, map.getZoom(), { animate: true });
    }
  }, [center, map]);
  return null;
}

export default function MapView({ shops, onShopClick, selectedShop }) {
  // const defaultCenter = userLocation || [
  //   shops[0].location.latitude,
  //   shops[0].location.longitude,
  // ];\

  // console.log(
  //   "MapView => shop list  =",
  //   shops[0].location.latitude,
  //   shops[0].location.longitude
  // );

  const { coords, getLocation } = CurrentLocation();
  const [userLocation, setUserlocation] = useState(null);
  const [currentCenter, setCurrentCenter] = useState(null);

  const defaultCenter = selectedShop
    ? [selectedShop.location.latitude, selectedShop.location.longitude]
    : [shops[0].location.latitude, shops[0].location.longitude];

  const mapZoom = selectedShop ? 16 : 15;

  useEffect(() => {
    getLocation();
    //   const _defaultCenter = selectedShop
    //     ? [selectedShop.location.latitude, selectedShop.location.longitude]
    //     : [shops[0].location.latitude, shops[0].location.longitude];

    //   setDefaultCenter(_defaultCenter);
  }, []);

  useEffect(() => {
    callApiLog("mapView -> 79 -> userLocation = " + JSON.stringify(coords));
    if (coords) {
      let _userLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };

      if (!selectedShop) {
        setCurrentCenter(_userLocation);
      }
      // setUserlocation(_userLocation);
    }
  }, [coords]);

  // const [mapZoom, setMapzoom] = useState(15)
  // const [mapCenter, setMapCenter] = useState();

  // useEffect(() => {
  //   if (selectedShop) {
  //     console.log("Map View => selected shop = ", selectedShop);
  //   }
  // }, [selectedShop]);

  // useEffect(() => {
  //   setMapCenter([shops[0].location.latitude, shops[0].location.longitude]);
  // }, []);

  // const onMarkerClick = (s) => {
  //   console.log(s);
  // };

  return (
    <div className="h-full w-full">
      {/* 
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}

      <MapContainer
        className="h-full w-full z-50"
        center={defaultCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater
          center={
            currentCenter
              ? [currentCenter.latitude, currentCenter.longitude]
              : null
          }
        />

        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userIcon()}
          ></Marker>
        )}

        {shops.map((shop) => (
          <Marker
            key={shop.id}
            position={[shop.location.latitude, shop.location.longitude]}
            icon={shopIcon}

            // eventHandlers={{
            //   click: () => onMarkerClick(shop),
            // }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-gray-900 mb-1">
                  {shop.shopName.th}
                </h3>
                {shop.address && (
                  <p className="text-sm text-gray-600 mb-2">
                    {shop.address.th}
                  </p>
                )}
                {shop.category && (
                  <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                    {shop.category}
                  </span>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
