import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Main, Leaderboards, StandardTable, Auth, Profile } from "./pages";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/leaderboards/:category" element={<Leaderboards />} />
          <Route path="/standardTable/:category" element={<StandardTable />} />
          <Route path="/auth/:category" element={<Auth />} />
          <Route path="/profile/:category" element={<Profile />} />
          <Route path="*" element={<h1>NotFound</h1>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
