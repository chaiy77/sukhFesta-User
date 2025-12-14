import React, { use, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Store, Navigation } from "lucide-react";
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

// User location marker icon
const userIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div style="background: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

export default function MapView({
  shops,
  userLocation,
  onShopClick,
  selectedShop,
}) {
  // const defaultCenter = userLocation || [
  //   shops[0].location.latitude,
  //   shops[0].location.longitude,
  // ];\

  console.log(
    "MapView => shop list  =",
    shops[0].location.latitude,
    shops[0].location.longitude
  );

  const defaultCenter = selectedShop
    ? [selectedShop.location.latitude, selectedShop.location.longitude]
    : [shops[0].location.latitude, shops[0].location.longitude];

  const mapZoom = selectedShop ? 16 : 15;

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

  const onMarkerClick = (s) => {
    console.log(s);
  };

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

        {/* <MapUpdater
          center={userLocation ? [userLocation.lat, userLocation.lng] : null}
        /> */}

        {/*{userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          >
            <Popup>
              <div className="text-center p-1">
                <p className="font-semibold text-blue-600">Your Location</p>
              </div>
            </Popup>
          </Marker>
        )} */}

        {shops.map((shop) => (
          <Marker
            key={shop.id}
            position={[shop.location.latitude, shop.location.longitude]}
            icon={shopIcon}
            eventHandlers={{
              click: () => onMarkerClick(shop),
            }}
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
