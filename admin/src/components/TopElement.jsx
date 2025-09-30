// TopElement.tsx
import React, { useEffect, useState } from "react";
import {
  FileText,
  ShieldAlert,
  File,
  PenTool,
  FileQuestion
} from "lucide-react";


export default function TopElement({
  type = "cases",
}) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(
    <FileText className="w-6 h-6 text-blue-600" />
  );

  useEffect(() => {
    switch (type) {
      case "questions":
        setName("Вопросы");
        setIcon(<FileQuestion className="w-6 h-6 text-blue-600" />);
        break;
      case "claims":
        setName("Заявки на ремонт");
        setIcon(<ShieldAlert className="w-6 h-6 text-blue-600" />);
        break;
      case "files":
        setName("Обращения юр. лиц");
        setIcon(<File className="w-6 h-6 text-blue-600" />);
        break;
      case "article":
        setName("Статьи");
        setIcon(<PenTool className="w-6 h-6 text-blue-600" />);
        break;
      default:
        setName("Раздел");
        break;
    }
  }, [type]);

  return (
    <div className="flex items-center justify-between px-5 pt-5 bg-gray-100 border-b pb-5">
      <div className="flex items-center space-x-2">
        {icon}
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>
    </div>
  );
}
