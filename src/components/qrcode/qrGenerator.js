"use client";

import { useRef, useEffect, useState } from "react";
// import QRCodeStyling from "qr-code-styling";
// Note: You install this via: npm install qr-code-styling

// Default options for a styled QR code
const qrCodeOptions = {
  width: 300,
  height: 300,
  data: "testData", // Default/initial data
  image: "", // Optional: Put your logo in the /public folder
  dotsOptions: {
    color: "#0000000", // LINE Blue
    type: "square",
  },
  qrOptions: {
    typeNumber: 0,
    errorCorrectionLevel: "L",
    mode: "Byte",
  },
  imageOptions: {
    margin: 0,
    hideBackgroundDots: true,
  },
};

export default function QrCodeGenerator({ qrData }) {
  // 1. Initialize the library instance using useState
  // We use useState instead of a plain variable to ensure it is initialized once.
  const [qrCodeInstance, setQrCodeInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);

  // --- 1. Client-Side Import and Initialization (Runs only on the browser) ---
  useEffect(() => {
    // Dynamically import the library here, inside useEffect
    // This code only runs after the component is mounted in the browser.
    import("qr-code-styling")
      .then((module) => {
        // Module.default is the QRCodeStyling class
        const QRCodeStyling = module.default;

        // Create the instance safely on the client
        const qrCode = new QRCodeStyling(qrCodeOptions);

        // Append the QR code to the ref
        if (ref.current) {
          // console.log("ref.inner QRCODE ", qrData);
          qrCode.append(ref.current);
        }

        // Store the instance and mark loading as complete
        setQrCodeInstance(qrCode);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.error("Failed to load qr-code-styling on client:", error);
        setIsLoading(false);
      });

    // Cleanup is still important
    return () => {
      if (ref.current) {
        // console.log("ref.inner QRCODE ", qrData);
        ref.current.innerHTML = "";
      }
    };
  }, []); // Empty dependency array: run once on mount

  useEffect(() => {
    // 🚨 NEW CRITICAL BLOCK 🚨
    if (qrCodeInstance && ref.current) {
      // console.log(ref.current);
      qrCodeInstance.append(ref.current);
    }
  }, [qrCodeInstance, ref.current]);
  // --- 2. Update Logic (Runs only after the instance is available) ---
  useEffect(() => {
    if (qrData && qrCodeInstance) {
      // Update the instance with the new URL
      // console.log("QR Generator ", qrData);
      qrCodeInstance.update({ data: qrData });
    }
  }, [qrData, qrCodeInstance]);

  // --- 3. Render Output ---
  if (isLoading) {
    return <div>Loading QR Code Generator...</div>;
  }

  return <div ref={ref} />;
}
