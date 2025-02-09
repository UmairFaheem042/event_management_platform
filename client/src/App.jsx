import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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

import { Header, ProtectedRoute } from "./components";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
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
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
