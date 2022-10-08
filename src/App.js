import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div>
      <Router>
        <Header onOpen={() => setSidebarVisible(true)} />
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
      </Router>
    </div>
  );
};

export default App;
