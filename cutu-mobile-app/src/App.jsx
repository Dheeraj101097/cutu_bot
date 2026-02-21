import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import BotChat from "./pages/BotChat";
import ImageUpload from "./pages/ImageUpload";
import StocksDashboard from "./pages/StocksDashboard";
import MusicPlayer from "./pages/MusicPlayer";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="bot" element={<BotChat />} />
        <Route path="images" element={<ImageUpload />} />
        <Route path="stocks" element={<StocksDashboard />} />
        <Route path="music" element={<MusicPlayer />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="help" element={<Help />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
