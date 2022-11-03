import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import {
  useSetRecoilState,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import {
  adminState,
  loginStatus,
  tokenState,
  isUserAuthenticated,
} from "./recoil/authentication";
import { Header, Footer } from "./components";
import {
  Main,
  Leaderboards,
  StandardTable,
  Auth,
  Profile,
  Admin,
  NotFound,
  About,
} from "./pages";
import useLocalStorage from "./hooks/useLocalstorage";
import { ScrollToTop } from "./utils/scrollToTop";
import GlobalStyle from "./styles/global";
import { darkTheme, lightTheme } from "./styles/theme";

const getPreferredColorScheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage(
    "theme",
    getPreferredColorScheme()
  );
  const setIsAdmin = useSetRecoilState(adminState);
  const [isLogined, setIsLogined] = useRecoilState(loginStatus);
  const TokenExist = useRecoilValue(tokenState);
  const {
    contents: { isTokenValid, isAdmin, userData },
  } = useRecoilValueLoadable(isUserAuthenticated);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const hadleClickDarkMode = () => {
    if (colorScheme === "dark") {
      setColorScheme("light");
    } else {
      setColorScheme("dark");
    }
  };

  useEffect(() => {
    if (!isLogined && TokenExist) {
      if (isTokenValid) {
        setIsLogined(true);
        setIsAdmin(isAdmin);
      }
    }
  }, [isLogined, TokenExist, isTokenValid, userData]);

  return (
    <Router>
      <ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
        <ScrollToTop />
        <GlobalStyle />
        <Header
          onOpen={() => setSidebarVisible(true)}
          isDark={colorScheme === "dark"}
          hadleClickDarkMode={hadleClickDarkMode}
        />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/leaderboards/:category" element={<Leaderboards />} />
            <Route
              path="/standardTable/:category"
              element={<StandardTable />}
            />
            <Route path="/auth/:category" element={<Auth />} />
            <Route path="/profile/:tag" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/admin/:type"
              element={
                <Admin
                  onClose={() => setSidebarVisible(false)}
                  visible={sidebarVisible}
                />
              }
            >
              <Route
                path="/admin/:type:category"
                element={
                  <Admin
                    onClose={() => setSidebarVisible(false)}
                    visible={sidebarVisible}
                  />
                }
              >
                /
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
