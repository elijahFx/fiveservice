"use client";

import Image from "next/image";
import {
  Phone,
  MessageCircle,
  Download,
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const CorporateHero = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info' | null;
    message: string;
  }>({ type: null, message: '' });

  // Автоматическое скрытие уведомления через 5 секунд
  useEffect(() => {
    if (notification.type) {
      const timer = setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/dogovor.pdf";
    link.download = "dogovor.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Улучшенная проверка типа файла
      const isDocFile =
        file.type.includes("msword") ||
        file.type.includes("openxmlformats") ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx");

      if (!isDocFile) {
        showNotification('error', "Пожалуйста, загрузите только файлы формата DOC или DOCX");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        showNotification('error', "Размер файла не должен превышать 10 МБ");
        return;
      }

      setSelectedFile(file);
      showNotification('success', "Файл выбран успешно!");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showNotification('error', "Пожалуйста, выберите файл для загрузки");
      return;
    }

    if (!navigator.onLine) {
      showNotification('error', "Нет подключения к интернету. Проверьте соединение.");
      return;
    }

    setIsUploading(true);
    showNotification('info', "Начинаем загрузку файла...");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const formData = new FormData();
      formData.append("requisites", selectedFile);
      
      const response = await fetch("https://testend2.site/upload", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      if (response.ok) {
        const result = await response.json();
        showNotification('success', "Файл успешно загружен! Мы свяжемся с Вами в ближайшее время.");
        setIsUploadModalOpen(false);
        setSelectedFile(null);
      } else {
        try {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `Ошибка сервера: ${response.status}`
          );
        } catch (parseError) {
          const errorText = await response.text();
          throw new Error(`Ошибка загрузки: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      if (error.name === "AbortError") {
        showNotification('error', "Загрузка превысила время ожидания. Попробуйте еще раз.");
      } else if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        showNotification('error', "Ошибка соединения с сервером. Проверьте интернет-соединение.");
      } else {
        showNotification('error', error.message || "Произошла ошибка при загрузке файла. Пожалуйста, попробуйте еще раз.");
      }
    } finally {
      clearTimeout(timeoutId);
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    showNotification('info', "Файл удален");
  };

  // Компонент уведомления
  const Notification = () => {
    if (!notification.type) return null;

    const bgColor = {
      success: "bg-green-50 border-green-200",
      error: "bg-red-50 border-red-200",
      info: "bg-blue-50 border-blue-200"
    };

    const textColor = {
      success: "text-green-800",
      error: "text-red-800",
      info: "text-blue-800"
    };

    const icons = {
      success: <CheckCircle className="w-5 h-5 text-green-500" />,
      error: <AlertCircle className="w-5 h-5 text-red-500" />,
      info: <Clock className="w-5 h-5 text-blue-500" />
    };

    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor[notification.type]} ${textColor} shadow-lg flex items-center space-x-3 min-w-80 max-w-md transition-all duration-300`}>
        {icons[notification.type]}
        <p className="text-sm font-medium">{notification.message}</p>
        <button
          onClick={() => setNotification({ type: null, message: '' })}
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <>
      <Notification />
      
     <section className="relative py-20 bg-gradient-to-br from-navy-900 to-gray-900 text-white overflow-hidden pt-24 sm:pt-28">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Корпоративное обслуживание"
            fill
            className="object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Корпоративное
              <span className="block text-blue-400">обслуживание</span>
              техники
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Профессиональное техническое обслуживание компьютерного парка
              вашей организации с заключением договора и гарантийными
              обязательствами
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="bg-navy-600 hover:bg-navy-700">
                <Phone className="w-5 h-5 mr-2" />
                <a href="tel:+375297349077">Получить консультацию</a>
              </Button>

              <Button
                size="lg"
                className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-navy-900 transition-colors duration-300"
                onClick={handleDownload}
              >
                <Download className="w-5 h-5 mr-2" />
                Скачать образец договора
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white flex flex-col items-center justify-center h-auto py-3"
                onClick={() => setIsUploadModalOpen(true)}
              >
                <div className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Загрузить свои реквизиты
                </div>
                <div className="text-sm font-normal">(для сотрудничества)</div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно для загрузки реквизитов */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <button
              onClick={() => {
                setIsUploadModalOpen(false);
                setSelectedFile(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-navy-900 mb-4 text-center">
              Загрузка реквизитов организации
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  В реквизитах необходимо указать:
                </h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Юридическое наименование организации</li>
                  <li>Юридический адрес</li>
                  <li>Почтовый адрес (если имеется)</li>
                  <li>УНП</li>
                  <li>Банковские реквизиты (название банка, БИК, Р/С)</li>
                  <li>Данные для связи (номера телефонов)</li>
                </ul>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="requisites-file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {!selectedFile ? (
                  <label
                    htmlFor="requisites-file"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                  >
                    <Upload className="w-12 h-12 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">
                      Нажмите для выбора файла или перетащите его сюда
                    </span>
                    <span className="text-xs text-gray-500">
                      Поддерживаются только DOC и DOCX файлы (макс. 10 МБ)
                    </span>
                  </label>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800 truncate max-w-xs">
                        {selectedFile.name}
                      </span>
                    </div>
                    <button
                      onClick={removeFile}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isUploading ? (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 animate-pulse" />
                    Загрузка...
                  </div>
                ) : (
                  "Отправить реквизиты"
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                После отправки файлов мы свяжемся с Вами в максимально короткие сроки
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CorporateHero;