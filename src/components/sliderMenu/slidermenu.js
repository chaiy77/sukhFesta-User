export default function HorizontalSliderMenu({
  menus,
  activeTab,
  onClickHandle,
}) {
  return (
    <nav className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <ul className="flex flex-nowrap overflow-x-auto no-scrollbar py-3 px-4 gap-6 items-center">
        {menus.map((menu, index) => (
          <li key={index} className="flex-none">
            <button
              onClick={() => onClickHandle(index)} // ✅ เรียกใช้ฟังก์ชันที่ส่งมาจากแม่
              className={`px-1 py-1  text-sm font-medium transition-all
                ${
                  activeTab === index
                    ? "bg-gray-400 text-white shadow-md" // สไตล์ตอนเลือก
                    : "text-gray-500 hover:bg-gray-100" // สไตล์ปกติ
                }`}
            >
              {menu}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
