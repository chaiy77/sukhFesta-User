import { Settings } from "lucide-react"; // หรือ icon ตัวอื่นที่คุณใช้
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function AreaSelect() {
  return (
    <Select modal={false}>
      {/* ปรับแต่ง Trigger ให้เหลือแค่ Icon และลบลูกศรออกถ้าไม่ต้องการ */}
      <SelectTrigger
        onMouseDown={(e) => {
          e.preventDefault();
          console.log("click");
        }}
        className="w-[100px] h-[200px] p-0 flex justify-center border-none shadow-none focus:ring-0"
      >
        <Settings className="h-5 w-5" />
        {/* หมายเหตุ: ปกติ SelectTrigger จะมี Icon ลูกศรด้านขวาแฝงอยู่ 
            ถ้าอยากเอาออกต้องไปแก้ที่ไฟล์ตัวเลือกใน components/ui/select.tsx */}
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="profile">Profile</SelectItem>
        <SelectItem value="billing">Billing</SelectItem>
        <SelectItem value="logout">Logout</SelectItem>
      </SelectContent>
    </Select>
  );
}
