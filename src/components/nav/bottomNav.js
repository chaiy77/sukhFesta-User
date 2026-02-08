"use client";

// import { Map, QrCode, Store, MapPin } from "lucide-react";
import { use, useEffect } from "react";
import { Home as HomeIcon, QrCode, MapPin, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { callApiLog } from "@/tools/apiLog";
const navItems = [
  { name: "Home", icon: HomeIcon, page: "main", id: "main" },
  { name: "Scan", icon: QrCode, page: "scanQR", id: "scanQR" },
  { name: "Map", icon: Map, page: "map", id: "map" },
];

export default function BottomNav({ activeTab, onTabChange }) {
  useEffect(() => {
    callApiLog(activeTab);
  }, []);
  return (
    <>
      {/* Mobile Bottom Nav  */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card lg:hidden"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-lg items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const isScan = item.id === "scanQR";
            if (isScan) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className="group relative -mt-6 flex flex-col items-center gap-0.5"
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground scale-110"
                        : "bg-primary text-primary-foreground",
                    )}
                  >
                    <item.icon className="h-6 w-6" />
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-medium transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center gap-0.5 px-3 py-1"
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
      {/* Desktop Side Navigation  */}
      <aside
        className="fixed left-0 top-0 z-50 hidden h-dvh w-64 flex-col border-r border-border bg-card lg:flex"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-border px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">PointGo</h1>
            <p className="text-xs text-muted-foreground">Discover & Earn</p>
          </div>
        </div>
        {/* Nav Links */}
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
        {/* Bottom User Section */}

        <div className="border-t border-border px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-primary/5 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                Alex Johnson
              </p>
              <p className="text-xs text-muted-foreground">1,250 points</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
