import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = useSelector((state) => state?.auth?.nickname);
  const user = useSelector((state) => state?.auth?.user);
  console.log(user);
  console.log(userName);

  const avatarLink = `https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg`;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleGoToMain = () => {
    window.location.href = "http://testend.site";
  };

  // SVG логотип аналогичный тому, что используется в favicon
  const logoSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="ml-1 h-10 w-10 object-contain cursor-pointer transition-all duration-400 hover:h-14 hover:w-12"
    >
      <rect width="32" height="32" rx="6" fill="#1e3a8a" />
      <text
        x="16"
        y="20"
        textAnchor="middle"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="bold"
      >
        FS
      </text>
    </svg>
  );

  return (
    <header className="fixed top-0 left-0 z-10 bg-white h-[11vh] w-screen flex justify-between items-center px-3.5 shadow-sm">
      <div className="flex items-center gap-2 max-w-[50%] h-full overflow-hidden">
        <Link to="/" className="flex items-center h-full">
          {logoSvg}
        </Link>
        <div className="flex flex-col justify-center overflow-hidden text-ellipsis">
          <h3 className="text-sm sm:text-base md:text-xl leading-tight truncate">
            fiveservice.by/<span className="font-semibold">admin</span>
          </h3>
          <h4 className="text-[10px] sm:text-xs leading-tight truncate">
            Автоматизированная система управления fiveservice
          </h4>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Кнопка "На главную" */}
        <button
          onClick={handleGoToMain}
          className="cursor-pointer bg-blue-600 hover:bg-[#1e3a8a] text-white px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium"
        >
          На главную
        </button>

        <div className="h-10 w-10 rounded-full flex items-center justify-center border border-gray-300 overflow-hidden">
          <a data-tooltip-id="my-tooltip" className="h-full w-full">
            <img
              src={avatarLink}
              alt="Аватар"
              className="h-full w-full object-cover cursor-pointer"
            />
          </a>
          <Tooltip
            id="my-tooltip"
            clickable
            className="z-50"
            render={({ content }) => (
              <div className="flex content-center justify-center flex-col">
                <p className="cursor-pointer transition-all duration-400 hover:underline">
                  <Link to="/account">{userName || user}</Link>
                </p>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 font-medium mt-1 transition-all duration-400 cursor-pointer"
                >
                  Выйти
                </button>
              </div>
            )}
          />
        </div>
      </div>
    </header>
  );
}
