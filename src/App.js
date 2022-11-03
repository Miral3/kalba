import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { adminState, jwtToken, loginStatus } from "./recoil/authentication";
import { checkAdmin } from "./api/account";
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
  const token = useRecoilValue(jwtToken);
  const setisLoggedIn = useSetRecoilState(loginStatus);
  const setIsAdmin = useSetRecoilState(adminState);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const hadleClickDarkMode = () => {
    if (colorScheme === "dark") {
      setColorScheme("light");
    } else {
      setColorScheme("dark");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      try {
        if (token) {
          const res = await checkAdmin(token);
          if (res.status === 200) {
            setisLoggedIn(true);
            setIsAdmin(res.data.admin);
          }
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
      }
      setIsLoading(false);
    };
    fetch();
  }, []);

  return (
    <Router>
      <ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
        {!isLoading && (
          <>
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
                <Route
                  path="/leaderboards/:category"
                  element={<Leaderboards />}
                />
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
          </>
        )}
      </ThemeProvider>
    </Router>
  );
};

export default App;
