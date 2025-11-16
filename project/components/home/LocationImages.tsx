import { Button } from "../ui/button";
import { X } from "lucide-react";

const LocationImages = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-semibold text-gray-900">
            Как к нам попасть?
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img
                  src="/vxod2.webp"
                  alt="Вход в сервисный центр - вариант 1"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img
                  src="/vxod1.webp"
                  alt="Вход в сервисный центр - вариант 2"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t">
          <Button onClick={onClose} className="bg-navy-600 hover:bg-navy-700">
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationImages