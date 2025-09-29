import { useState } from "react";
import {
  ShieldAlert,
  PenTool,
  ChevronRight,
  ChevronLeft,
  FileQuestion,
  File
} from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const status = useSelector((state) => state.auth.status)
  const isAdmin = status === "admin" ? true : false

  const menuItems = [
    {
      label: "Заявки на ремонт",
      icon: <ShieldAlert color="#0C1B60" />,
      link: "/claims",
    },
     {
      label: "Статьи",
      icon: <PenTool color="#0C1B60" />,
      link: "/articles",
    },
    {
      label: "Вопросы",
      icon: <FileQuestion color="#0C1B60" />,
      link: "/questions",
    },
    {
      label: "Обращения юр. лиц",
      icon: <File color="#0C1B60" />,
      link: "/files",
    },
  ];

  // Фильтруем пункты меню в зависимости от прав пользователя
  const filteredMenuItems = menuItems.filter(item => {
    // Если пункт меню имеет ограничение (restricted: true)
    if (item.restricted) {
      // Показываем только админам и пользователям с status === "bugh"
      return status === "admin" || status === "bugh";
    }
    // Все остальные пункты меню показываем всем
    return true;
  });

  return (
    <div className="flex h-full">
      <div
        className={`bg-white h-full transition-all duration-300 ease-in-out mt-[11vh] ${
          isOpen
            ? "w-64 shadow-[2px_0_6px_rgba(0,0,0,0.1)]"
            : "w-20 shadow-[2px_0_6px_rgba(0,0,0,0.1)]"
        }`}
      >
        <div
          className={`flex items-center justify-center px-4 py-4 ${
            isOpen ? "shadow-sm" : ""
          }`}
        >
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500">
            {isOpen ? (
              <ChevronLeft color="#0C1B60" className="cursor-pointer" />
            ) : (
              <ChevronRight color="#0C1B60" className="cursor-pointer" />
            )}
          </button>
        </div>

        <nav className="mt-4">
          {filteredMenuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="flex items-center px-6.5 py-3 text-gray-700 hover:bg-gray-100 transition-colors group"
            >
              <div className="w-6 h-6">{item.icon}</div>
              {isOpen && (
                <span className="ml-3 transition-opacity duration-300">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;