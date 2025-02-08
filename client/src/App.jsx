import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// import LandingPage from "./pages/LandingPage";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import Dashboard from "./pages/Dashboard";
// import EventPage from "./pages/EventPage";
// import Events from "./pages/Events";
// import MyEvents from "./pages/MyEvents";
// import CreateEvent from "./pages/CreateEvent";
// import NotFound from "./pages/NotFound";

import {
  LandingPage,
  SignUp,
  SignIn,
  Dashboard,
  EventPage,
  Events,
  CreateEvent,
  MyEvents,
  NotFound,
} from "./pages";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<>About Page</>} />
        <Route path="/event" element={<Events />} />
        <Route path="/event/:eventId" element={<EventPage />} />

        {/* Authenticated Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my_events"
          element={
            <ProtectedRoute>
              <MyEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event/create_event"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
