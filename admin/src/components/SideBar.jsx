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
  const [isAnimating, setIsAnimating] = useState(false);
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

  const handleToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsOpen(!isOpen);
    
    // Сбрасываем флаг анимации после завершения перехода
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

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
        style={{
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div
          className={`flex items-center transition-all duration-300 px-4 py-4 ${
            isOpen ? "shadow-sm justify-start" : "justify-center"
          }`}
        >
          <button 
            onClick={handleToggle} 
            className="text-gray-500 transition-transform duration-300 hover:scale-110"
            disabled={isAnimating}
          >
            {isOpen ? (
              <ChevronLeft color="#0C1B60" className="cursor-pointer" />
            ) : (
              <ChevronRight color="#0C1B60" className="cursor-pointer" />
            )}
          </button>
          {isOpen && (
            <span className="ml-3 text-sm font-medium text-gray-700 opacity-0 animate-fade-in">
              Меню
            </span>
          )}
        </div>

        <nav className="mt-4">
          {filteredMenuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="flex items-center px-6.5 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-200 group relative overflow-hidden"
            >
              <div className="w-6 h-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
              <div
                className={`ml-3 transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "max-w-[200px] opacity-100" 
                    : "max-w-0 opacity-0"
                }`}
                style={{
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <span className="whitespace-nowrap text-sm font-medium">
                  {item.label}
                </span>
              </div>
              
              {/* Подсветка при наведении */}
              <div className="absolute inset-y-0 left-0 w-1 bg-[#0C1B60] opacity-0 transition-all duration-200 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-0" />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;