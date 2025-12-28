// app/components/ImportantAnnouncement.tsx

export default function ImportantAnnouncement() {
  return (
 
        <div className="mt-8 w-full max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-amber-600/90 to-amber-700/90 backdrop-blur-sm rounded-xl border-2 border-amber-500/60 shadow-xl hover:shadow-amber-500/30 transition-all duration-300">
            
            {/* Заголовок "Важное объявление!" */}
            <div className="px-6 pt-4 pb-2">
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-white/25 rounded-full flex items-center justify-center shadow-inner">
                      <svg 
                        className="w-5 h-5 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-wide">
                    Важное объявление!
                  </h2>
                </div>
              </div>
            </div>

            {/* Разделитель */}
            <div className="px-6">
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>

            {/* Основное содержание */}
            <div className="px-6 py-4">
              <div className="text-center">
                <p className="text-lg font-medium text-white">
                  <span className="font-bold bg-white/15 px-3 py-1 rounded-lg shadow-sm">Сервисный центр не работает</span>
                  {" "}
                  <span className="inline-block mx-2">с</span>
                  <span className="font-bold text-white bg-amber-800/50 px-3 py-1 rounded-lg">25 декабря</span>
                  <span className="inline-block mx-2">по</span>
                  <span className="font-bold text-white bg-amber-800/50 px-3 py-1 rounded-lg">28 декабря</span>
                </p>
                
                <div className="mt-4">
                  <p className="text-lg font-medium text-white">
                    С <span className="font-bold text-white bg-green-700/50 px-3 py-1 rounded-lg">29 декабря</span> 
                    <span className="inline-block ml-3">– обычный график работы</span>
                  </p>
                </div>

                {/* Дополнительная информация */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  <p className="text-sm text-white/90 font-medium">
                    Приносим извинения за временные неудобства
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
     
  );
}