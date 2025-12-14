import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Navigation,
  ExternalLink,
  Store,
} from "lucide-react";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

const categoryColors = {
  restaurant: "bg-orange-100 text-orange-700 border-orange-200",
  cafe: "bg-amber-100 text-amber-700 border-amber-200",
  retail: "bg-blue-100 text-blue-700 border-blue-200",
  entertainment: "bg-purple-100 text-purple-700 border-purple-200",
  service: "bg-green-100 text-green-700 border-green-200",
};

export default function ShopDetailExpanded({ shop, userLocation, onBack }) {
  const distance = userLocation
    ? calculateDistance(
        userLocation.lat,
        userLocation.lng,
        shop.latitude,
        shop.longitude
      )
    : null;

  const openInMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`;
    window.open(url, "_blank");
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <Button variant="ghost" onClick={onBack} className="mb-3 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to List
        </Button>

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {shop.name}
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              {shop.category && (
                <Badge className={`${categoryColors[shop.category]} border`}>
                  {shop.category ? (
                    <div>shop.category</div>
                  ) : (
                    <div>shop category</div>
                  )}
                </Badge>
              )}
              {distance && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Navigation className="w-3 h-3" />
                  {distance} km away
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Image */}
        {shop.image_url ? (
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
            <img
              src={shop.image_url}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <Store className="w-16 h-16 text-indigo-600" />
          </div>
        )}

        {/* Description */}
        {shop.description && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Store className="w-4 h-4 text-indigo-600" />
                About
              </h3>
              <p className="text-gray-600">{shop.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 mb-3">Information</h3>

            {shop.address && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Address
                  </p>
                  <p className="text-sm text-gray-600">{shop.address}</p>
                </div>
              </div>
            )}

            {shop.phone && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Phone className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${shop.phone}`}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    {shop.phone}
                  </a>
                </div>
              </div>
            )}

            {shop.hours && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Hours
                  </p>
                  <p className="text-sm text-gray-600">{shop.hours}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Coordinates */}
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-gray-600 mb-1">Coordinates</p>
            <p className="text-sm font-mono text-gray-900">
              {shop.latitude.toFixed(6)}, {shop.longitude.toFixed(6)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 p-4">
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-6"
          onClick={openInMaps}
        >
          <Navigation className="w-5 h-5 mr-2" />
          Get Directions
        </Button>
      </div>
    </div>
  );
}
