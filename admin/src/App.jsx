import Loader from "./components/Loader";
import NotFound from "./Components/NotFound";
import Login from "./components/Login";
import SideBar from "../src/components/SideBar";
import Header from "../src/components/Header"
import Account from "./components/Account";
import FileOverview from "./components/Files/FileOverview";
import QuestionOverview from "./components/Questions/QuestionOverview"
import ArticleOverview from "./components/Articles/ArticleOverview"
import ClaimsOverview from "./components/Claims/ClaimsOverview"
import SingleClaim from "./components/Claims/SingleClaim";
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

    console.log(savedUser);
    

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

  const pathsWithoutLayout = [];
  const isMinimalPage = pathsWithoutLayout.includes(location.pathname);
  
  return (
    <div className="box-border m-0 p-0 ">
      <div className="flex flex-col h-screen ">
        {!isMinimalPage && isAuthenticated && <Header />}
        <div className={isMinimalPage || !isAuthenticated ? "" : "flex flex-row flex-1"}>
          {!isMinimalPage && isAuthenticated && <SideBar />}

          <Routes>
            {/* Публичные маршруты */}
            <Route path="/" element={isAuthenticated ? <ClaimsOverview /> : <Login />} />

            {/* Условный доступ к маршрутам */}
             <Route path="/claims/:id" element={isAuthenticated ? <SingleClaim /> : <Loader />} />
            <Route path="/claims" element={isAuthenticated ? <ClaimsOverview /> : <Loader />} />
            <Route path="/files" element={isAuthenticated ? <FileOverview /> : <Login />} />
            <Route path="/questions" element={isAuthenticated ? <QuestionOverview /> : <Login />} />
            <Route path="/articles" element={isAuthenticated ? <ArticleOverview type="article"/> : <Login />} />
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
