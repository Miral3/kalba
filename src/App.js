import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
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
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const hadleClickDarkMode = () => {
    if (colorScheme === "dark") {
      setColorScheme("light");
    } else {
      setColorScheme("dark");
    }
  };

  return (
    <Router>
      <ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Header
          onOpen={() => setSidebarVisible(true)}
          isDark={colorScheme === "dark"}
          hadleClickDarkMode={hadleClickDarkMode}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/leaderboards/:category" element={<Leaderboards />} />
          <Route path="/standardTable/:category" element={<StandardTable />} />
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
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
