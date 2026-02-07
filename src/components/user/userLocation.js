"use client";
import React, { useState, useEffect } from "react";
import { callApiLog } from "@/tools/apiLog";

export const CurrentLocation = () => {
  const [coords, setCoords] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser ของคุณไม่รองรับการดึงพิกัด");
      return;
    }

    // แสดง Loading หรือบอก User ว่ากำลังดึงพิกัด
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        callApiLog("userLocation => 19 => " + lat);
        setCoords({ latitude: lat, longitude: lng });
      },
      (error) => {
        // กรณี User กด "Deny" หรือปิด GPS
        console.error("Error code:", error.code);
        alert("กรุณาเปิดสิทธิ์เข้าถึงพิกัด");
      },
      {
        enableHighAccuracy: true, // ใช้ GPS เพื่อความแม่นยำสูง
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };
  return { coords, getLocation };
};
