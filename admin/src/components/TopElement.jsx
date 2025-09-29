// TopElement.tsx
import React, { useEffect, useState } from "react";
import {
  FileText,
  PlusCircle,
  Trash2,
  Send,
  FileCode,
  Calendar,
  ShieldAlert,
  CircleDollarSign,
  Pen,
  File,
  Calculator,
  PenTool,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function TopElement({
  type = "cases",
  selectedItems = [],
  onDelete,
}) {
  const status = useSelector((state) => state.auth.status);
  const isDeleteDisabled =
    status !== "admin" ? true : selectedItems.length === 0;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(
    <FileText className="w-6 h-6 text-blue-600" />
  );

  console.log(type);

  useEffect(() => {
    switch (type) {
      case "cases":
        setName("Дела");
        break;
      case "in_corr":
        setName("Входящая корреспонденция");
        setIcon(<FileCode className="w-6 h-6 text-blue-600" />);
        break;
      case "out_corr":
        setName("Исходящая корреспонденция");
        setIcon(<Send className="w-6 h-6 text-blue-600" />);
        break;
      case "calendar":
        setName("Календарь");
        setIcon(<Calendar className="w-6 h-6 text-blue-600" />);
        break;
      case "claims":
        setName("Конструктор претензий");
        setIcon(<ShieldAlert className="w-6 h-6 text-blue-600" />);
        break;
      case "finance":
        setName("Финансы/поступления денежных средств");
        setIcon(<CircleDollarSign className="w-6 h-6 text-blue-600" />);
        break;
      case "accounting":
        setName("Бухгалтерия");
        setIcon(<Calculator className="w-6 h-6 text-blue-600" />);
        break;
      case "appeals":
        setName("Обращения/заметки");
        setIcon(<Pen className="w-6 h-6 text-blue-600" />);
        break;
      case "files":
        setName("Файловая система");
        setIcon(<File className="w-6 h-6 text-blue-600" />);
        break;
      case "article":
        setName("Статьи/Новости");
        setIcon(<PenTool className="w-6 h-6 text-blue-600" />);
        break;
      default:
        setName("Раздел");
        break;
    }
  }, [type]);

  const handleAddClick = () => {
    switch (type) {
      case "cases":
        navigate("/add_case");
        break;
      case "in_corr":
        navigate("/in_corr/+");
        break;
      case "out_corr":
        navigate("/out_corr/+");
        break;
      case "calendar":
        navigate("/event/+");
        break;
      case "appeals":
        navigate("/appeals/+");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-between px-5 pt-5 bg-gray-100 border-b pb-5">
      <div className="flex items-center space-x-2">
        {icon}
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>
      {type !== "finance" && type !== "files" && type !== "article" && (
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddClick}
            className="flex items-center gap-1 px-3 py-1 cursor-pointer bg-green-500 text-white rounded hover:bg-green-600"
          >
            <PlusCircle className="w-4 h-4" />
            Добавить
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleteDisabled}
            className={`flex items-center gap-1 px-3 py-1 rounded text-white ${
              isDeleteDisabled
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}
