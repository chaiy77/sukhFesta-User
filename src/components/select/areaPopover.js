"use client";

import * as React from "react";
import { Settings, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const categories = [
  { value: "all", label: "ทุกอำเภอ" },
  { value: "mueang", label: "อำเภอเมือง" },
  { value: "kongkrailat", label: "อำเภอกงไกรลาศ" },
  { value: "khirimat", label: "อำเภอคีรีมาศ" },
  { value: "lanhoi", label: "อำเภอบ้านด่านลานหอย" },
  { value: "sawankhalok", label: "อำเภอสวรรคโลก" },
  { value: "thungsaliam", label: "อำเภอทุ่งเสลี่ยม" },
  { value: "srinakhon", label: "อำเภอศรีนคร" },
  { value: "srisatchanalai", label: "อำเภอศรีสัชนาลัย" },
  { value: "srisamrong", label: "อำเภอศรีสำโรง" },
];

export default function SelectAreaPopover({ onSelect }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [label, setLabel] = React.useState("ทุกอำเภอ");

  React.useEffect(() => {
    console.log(label);
  }, [label]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* ใช้ Button ของ shadcn เป็น Trigger แทนปุ่ม 45x45 ของคุณ */}
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-[45px] p-0 flex justify-start border-none shadow-none hover:bg-gray-100"
        >
          <div className="flex flex-row w-full text-gray-500 ">
            <div className="items-center "> {label}</div>
            <div className="items-center py-1 px-4">
              <ChevronDown />
            </div>
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="flex flex-col">
          {categories.map((category) => (
            <button
              key={category.value}
              className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-2 px-3 text-sm outline-none hover:bg-blue-50 transition-colors",
                value === category.value
                  ? "text-blue-600 font-medium"
                  : "text-gray-600"
              )}
              onClick={() => {
                setValue(category.value);
                setOpen(false); // เลือกแล้วปิด
                setLabel(category.label);
                onSelect(category.value);
              }}
            >
              {category.label}
              {value === category.value && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
