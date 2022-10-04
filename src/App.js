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
          <Route path="/profile/:category" element={<Profile />} />
          <Route
            path="/admin/*"
            element={
              <Admin
                onClose={() => setSidebarVisible(false)}
                visible={sidebarVisible}
              />
            }
          />
          <Route path="*" element={<h1>NotFound</h1>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
