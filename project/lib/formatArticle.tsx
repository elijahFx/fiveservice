import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const formatContent = (content: string) => {
  const lines = content.split("\n");
  const elements = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Пропускаем пустые строки
    if (line === "") continue;

    // Заголовки второго уровня
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200"
        >
          {line.replace("## ", "")}
        </h2>
      );
      continue;
    }

    // Обработка таблиц
    if (line.startsWith("table(") && line.endsWith(")")) {
      const tableContent = line.slice(6, -1); // Убираем "table(" и ")"
      
      // Разделяем на части: столбцы, строки, содержание
      const parts = tableContent.split(')(');
      
      if (parts.length === 3) {
        const columns = parts[0].split(',').map(col => col.trim());
        const rows = parts[1].split(',').map(row => row.trim());
        const contentItems = parts[2].split(',').map(item => item.trim());
        
        // Создаем таблицу
        elements.push(
          <div key={i} className="mb-6 sm:mb-8 overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <thead>
                <tr className="bg-blue-50">
                  {columns.map((column, index) => (
                    <th 
                      key={index}
                      className="px-4 py-3 text-left text-sm font-semibold text-blue-800 border-b border-blue-200"
                    >
                      {formatInlineElements(column)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                      {formatInlineElements(row)}
                    </td>
                    {columns.slice(1).map((_, colIndex) => {
                      const contentIndex = rowIndex * (columns.length - 1) + colIndex;
                      return (
                        <td 
                          key={colIndex}
                          className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200"
                        >
                          {contentIndex < contentItems.length 
                            ? formatInlineElements(contentItems[contentIndex])
                            : ''
                          }
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Обработка YouTube видео
    if (line.startsWith("video(") && line.endsWith(")")) {
      const videoUrl = line.slice(6, -1).trim(); // Убираем "video(" и ")"
      
      // Извлекаем ID видео из различных форматов YouTube URL
      let videoId = "";
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = videoUrl.match(youtubeRegex);
      
      if (match && match[1]) {
        videoId = match[1];
      } else {
        // Если не удалось извлечь ID, используем как есть (может быть уже ID)
        videoId = videoUrl;
      }

      if (videoId) {
        elements.push(
          <div key={i} className="mb-6 sm:mb-8">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 sm:h-80 md:h-96 lg:h-108"
                loading="lazy"
              />
            </div>
          </div>
        );
      }
      continue;
    }

    // Обработка изображений с приписками
    if (line.startsWith('![')) {
      const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imageMatch) {
        const [_, alt, src] = imageMatch;
        
        // Проверяем, есть ли следующая строка с припиской в формате [текст]
        let caption = null;
        if (i + 1 < lines.length && lines[i + 1].trim().startsWith('[') && lines[i + 1].trim().endsWith(']')) {
          caption = lines[i + 1].trim().slice(1, -1); // Убираем квадратные скобки
          i++; // Пропускаем строку с припиской
        }

        elements.push(
          <div key={i} className="mb-6 sm:mb-8">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={src}
                alt={alt || 'Изображение'}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            {caption && (
              <div className="mt-3 text-sm text-gray-600 text-center italic">
                {formatInlineElements(caption)}
              </div>
            )}
          </div>
        );
        continue;
      }
    }

    // Справочно: блоки (обновленные стили)
    if (line.includes("Справочно:") || line.includes("СПРАВОЧНО:")) {
      const referenceItems = [line.replace(/(Справочно:|СПРАВОЧНО:)\s?/, "")];

      // Собираем все последующие строки справочной информации
      while (
        i + 1 < lines.length &&
        lines[i + 1].trim() !== "" &&
        !lines[i + 1].trim().startsWith("## ") &&
        !lines[i + 1].trim().match(/^\d+\.\s/) &&
        !lines[i + 1].trim().match(/^\d+\)\s/) &&
        !lines[i + 1].trim().startsWith("• ") &&
        !lines[i + 1].trim().startsWith("o ") &&
        !lines[i + 1].trim().startsWith("video(") &&
        !lines[i + 1].trim().startsWith("table(")
      ) {
        i++;
        referenceItems.push(lines[i].trim());
      }

      elements.push(
        <div
          key={i}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-4 my-4 text-sm"
        >
          <div className="flex items-start gap-3">
            <span className="text-blue-700 font-semibold whitespace-nowrap">
              Справочно:
            </span>
            <div className="text-blue-800 space-y-2">
              {referenceItems.map((item, idx) => (
                <div key={idx} className="leading-relaxed">
                  {formatInlineElements(item)}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      continue;
    }

    // Формулы (/ содержание /) - обновленные стили
    if (line.startsWith("/") && line.endsWith("/") && line.length > 2) {
      const formulaContent = line.slice(1, -1).trim();
      elements.push(
        <div
          key={i}
          className="bg-gray-100 border-l-4 border-blue-500 italic p-4 my-4 rounded-r-2xl"
        >
          {formatInlineElements(formulaContent)}
        </div>
      );
      continue;
    }

    // Важные блоки - обновленные стили
    if (
      line.includes("ВАЖНО:") ||
      line.includes("❗") ||
      line.includes("Важно:")
    ) {
      elements.push(
        <div
          key={i}
          className="bg-amber-50 p-4 my-4 rounded-2xl border-l-4 border-amber-500 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" />
            <div className="text-amber-900">
              {formatInlineElements(line)}
            </div>
          </div>
        </div>
      );
      continue;
    }

    // Нумерованные списки с точкой (1. 2. 3.)
    if (line.match(/^\d+\.\s/)) {
      const listItems = [line];

      // Собираем все последующие элементы нумерованного списка
      while (i + 1 < lines.length && lines[i + 1].trim().match(/^\d+\.\s/)) {
        i++;
        listItems.push(lines[i].trim());
      }

      elements.push(
        <ol key={i} className="my-6 space-y-4">
          {listItems.map((item, idx) => {
            const number = item.match(/^(\d+)\./)?.[1];
            const text = item.replace(/^\d+\.\s/, "");
            return (
              <li key={idx} className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">
                  {number}
                </span>
                <span className="text-gray-700 text-lg leading-7">
                  {formatInlineElements(text)}
                </span>
              </li>
            );
          })}
        </ol>
      );
      continue;
    }

    // Нумерованные списки со скобкой (1) 2) 3))
    if (line.match(/^\d+\)\s/)) {
      const listItems = [line];

      // Собираем все последующие элементы нумерованного списка
      while (i + 1 < lines.length && lines[i + 1].trim().match(/^\d+\)\s/)) {
        i++;
        listItems.push(lines[i].trim());
      }

      elements.push(
        <ol key={i} className="my-6 space-y-4">
          {listItems.map((item, idx) => {
            const number = item.match(/^(\d+)\)/)?.[1];
            const text = item.replace(/^\d+\)\s/, "");
            return (
              <li key={idx} className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-lg w-7 h-7 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">
                  {number}
                </span>
                <span className="text-gray-700 text-lg leading-7">
                  {formatInlineElements(text)}
                </span>
              </li>
            );
          })}
        </ol>
      );
      continue;
    }

    // Списки с маркерами • (включая специальный символ U+2022)
    if (line.startsWith("• ") || line.startsWith("\u2022 ")) {
      const listItems = [line.replace(/^[•\u2022]\s/, "")];

      // Собираем все последующие элементы списка
      while (
        i + 1 < lines.length &&
        (lines[i + 1].trim().startsWith("• ") ||
          lines[i + 1].trim().startsWith("\u2022 "))
      ) {
        i++;
        listItems.push(lines[i].trim().replace(/^[•\u2022]\s/, ""));
      }

      elements.push(
        <ul key={i} className="my-6 space-y-3">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1.5 flex-shrink-0">•</span>
              <span className="text-gray-700 text-lg leading-7">
                {formatInlineElements(item)}
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Списки с буквами o
    if (line.startsWith("o ")) {
      const listItems = [line.replace(/^o /, "")];

      // Собираем все последующие элементы списка
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith("o ")) {
        i++;
        listItems.push(lines[i].trim().replace(/^o /, ""));
      }

      elements.push(
        <ul key={i} className="my-6 space-y-3">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-gray-500 mr-3 mt-1.5 flex-shrink-0">○</span>
              <span className="text-gray-700 text-lg leading-7">
                {formatInlineElements(item)}
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Нумерованные шаги (жирный текст с цифрами)
    if (line.startsWith("**") && line.endsWith("**") && line.match(/\d+\./)) {
      elements.push(
        <h3
          key={i}
          className="text-xl font-semibold text-gray-900 mt-6 mb-4 flex items-start"
        >
          <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
            {line.match(/\d+/)?.[0]}
          </span>
          <span>{formatInlineElements(line.replace(/\*\*/g, ""))}</span>
        </h3>
      );
      continue;
    }

    // Эмодзи в начале строки (для разделов типа ⚖️)
    if (line.match(/^[⚖️🔧📋📝]/)) {
      elements.push(
        <h3
          key={i}
          className="text-xl font-semibold text-gray-900 mt-6 mb-4 flex items-center"
        >
          <span className="mr-2">{line.charAt(0)}</span>
          <span>{formatInlineElements(line.slice(1).trim())}</span>
        </h3>
      );
      continue;
    }

    // Обычные параграфы
    elements.push(
      <p key={i} className="text-gray-700 text-lg leading-7 mb-6">
        {formatInlineElements(line)}
      </p>
    );
  }

  return elements;
};

const formatInlineElements = (text: string) => {
  const parts = [];
  let currentText = text;

  while (currentText.length > 0) {
    // Ищем первое вхождение любого из форматирований
    const linkMatch = currentText.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const boldMatch = currentText.match(/\*([^*]+)\*/); // для *жирный*

    // Определяем, какое форматирование встречается раньше
    const linkIndex = linkMatch ? currentText.indexOf(linkMatch[0]) : Infinity;
    const boldIndex = boldMatch ? currentText.indexOf(boldMatch[0]) : Infinity;

    // Если нет больше форматирований, добавляем оставшийся текст и выходим
    if (linkIndex === Infinity && boldIndex === Infinity) {
      parts.push(currentText);
      break;
    }

    // Обрабатываем то форматирование, которое встречается раньше
    if (linkIndex < boldIndex) {
      // Обработка ссылок [текст](url)
      const [fullMatch, linkText, linkUrl] = linkMatch!;
      const beforeText = currentText.slice(0, linkIndex);

      if (beforeText) {
        parts.push(beforeText);
      }

      parts.push(
        <Link
          key={parts.length}
          href={linkUrl}
          className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </Link>
      );

      currentText = currentText.slice(linkIndex + fullMatch.length);
    } else {
      // Обработка жирного текста *текст*
      const [fullMatch, boldText] = boldMatch!;
      const beforeText = currentText.slice(0, boldIndex);

      if (beforeText) {
        parts.push(beforeText);
      }

      parts.push(
        <strong key={parts.length} className="font-semibold text-gray-900">
          {boldText}
        </strong>
      );

      currentText = currentText.slice(boldIndex + fullMatch.length);
    }
  }

  return parts;
};

export default formatContent;