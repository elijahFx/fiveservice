import Loader from "./components/Loader";
import NotFound from "./Components/NotFound";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import SideBar from "../src/components/SideBar";
import Header from "../src/components/Header"
import ClaimsOverview from "./components/Claims/ClaimsOverview";
import Account from "./components/Account";
import ClaimPage from "./components/Claims/ClaimPage";
import ArticleCreate from "./components/Article/ArticleCreate";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout, setCredentials } from "./slices/authSlice";



function AppWrapper() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const location = useLocation();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userASY"));
    if (savedUser) {
      const currentTime = Date.now();
      const FIVE_HOURS = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

      if (currentTime - savedUser.timestamp > FIVE_HOURS) {
        // More than 5 hours have passed, remove user data
        localStorage.removeItem("userASY");
        dispatch(logout());  // Ensure Redux state is updated
      } else {
        // Otherwise, log in the user
        dispatch(setCredentials(savedUser));
      }
    }
  }, [dispatch]);

  const pathsWithoutLayout = ["/", "/contract"];
  const isMinimalPage = pathsWithoutLayout.includes(location.pathname);
  
  return (
    <div className="box-border m-0 p-0 ">
      <div className="flex flex-col h-screen ">
        {!isMinimalPage && isAuthenticated && <Header />}
        <div className={isMinimalPage || !isAuthenticated ? "" : "flex flex-row flex-1"}>
          {!isMinimalPage && isAuthenticated && <SideBar />}

          <Routes>
            {/* Публичные маршруты */}
            <Route path="/" element={isAuthenticated ? <MainPage /> : <Login />} />

            {/* Условный доступ к маршрутам */}
            <Route path="/main" element={isAuthenticated ? <MainPage /> : <Loader />} />
            <Route path="/claims" element={isAuthenticated ? <ClaimsOverview /> : <Login />} />
            <Route path="/articles" element={isAuthenticated ? <ArticleCreate type="article"/> : <Login />} />
            <Route path="/claims/:number" element={isAuthenticated ? <ClaimPage /> : <Login />} />
            <Route path="/loader" element={isAuthenticated ? <Loader /> : <Login />} />
            <Route path="/account" element={isAuthenticated ? <Account /> : <Login />} />

            {/* 404 */}
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// Главный компонент с маршрутизатором
function App() {
  return (
    <BrowserRouter basename="/admin">
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
