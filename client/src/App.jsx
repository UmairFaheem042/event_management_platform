import React from "react";
import { Route, Routes } from "react-router-dom";
import Demo from "./components/demo";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import EventPage from "./pages/EventPage";
import Events from "./pages/Events";
import MyEvents from "./pages/MyEvents";
import Header from "./components/Header";
import CreateEvent from "./pages/CreateEvent";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/error" element={<Demo />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<>About Page</>} />

        {/* Authenticated Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my_events" element={<MyEvents />} />
        <Route path="/event" element={<Events />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/event/create_event" element={<CreateEvent />} />
      </Routes>
    </div>
  );
};

export default App;
