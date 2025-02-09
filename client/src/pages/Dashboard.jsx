import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateFormat";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState(null);
  const [upcomingEventList, setUpcomingEventList] = useState([]);
  const [completedEventList, setCompletedEventList] = useState([]);
  const [ticketsSold, setTicketsSold] = useState(0);

  function calcUpcoming() {
    if (!eventData) return;

    const upcoming = eventData.filter(
      (event) => formatDate(event.eventDateTime) === "Upcoming"
    );

    setUpcomingEventList(upcoming);
  }

  function calcCompleted() {
    if (!eventData) return;

    const completed = eventData.filter(
      (event) => formatDate(event.eventDateTime) === "Passed"
    );
    setCompletedEventList(completed);
  }

  function calcTicketsSold() {
    if (!eventData) return;
    const totalTickets = eventData.reduce(
      (sum, event) => sum + (event.attendees?.length || 0),
      0
    );
    setTicketsSold(totalTickets);
  }

  async function fetchUser() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/get_user",
        {
          withCredentials: true,
        }
      );

      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchEventDetails() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/event/display_my_events",
        { withCredentials: true }
      );
      setEventData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchEventDetails();
  }, []);

  useEffect(() => {
    if (eventData) {
      calcUpcoming();
      calcCompleted();
      calcTicketsSold();
    }
  }, [eventData]);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col flex-1 bg-white w-full max-w-[1400px] mx-auto p-6 lg:px-4">
      <div className="md:flex gap-4 items-start justify-between">
        <h1 className="text-center md:text-left text-4xl mb-6">
          Welcome, <span className="font-semibold">{userData?.firstName}</span>
        </h1>
        <div className="flex justify-center gap-4">
          <Link
            to="/event/create_event"
            className="bg-green-600 text-white py-2 px-6 rounded-md"
          >
            Create New Event
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="py-8 px-4 bg-[rgba(0,0,0,0.05)] border border-gray-300 rounded-lg text-center">
          <h2 className="text-2xl font-bold">📅 {upcomingEventList?.length}</h2>
          <p className="text-gray-600">Upcoming Events</p>
        </div>
        <div className="py-8 px-4 bg-[rgba(0,0,0,0.05)] border border-gray-300 rounded-lg text-center">
          <h2 className="text-2xl font-bold">
            ✅ {completedEventList?.length}
          </h2>
          <p className="text-gray-600">Completed Events</p>
        </div>
        <div className="py-8 px-4 bg-[rgba(0,0,0,0.05)] border border-gray-300 rounded-lg text-center">
          <h2 className="text-2xl font-bold">🎟️ {ticketsSold}</h2>
          <p className="text-gray-600">Tickets Sold</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      {upcomingEventList?.length > 0 ? (
        upcomingEventList.slice(0, 3).map((event) => (
          <div
            key={event._id}
            className="bg-[rgba(0,0,0,0.05)] border border-gray-300 p-4 rounded-lg mb-6"
          >
            <p>
              <strong>Event:</strong> {event.title}
            </p>
            <p>
              <strong>Date:</strong> {event.eventDateTime.split(" ")[0]}
            </p>
            <p>
              <strong>Location:</strong> {event.eventLocation}
            </p>
            <Link to={`/event/${event._id}`} className="text-blue-600">
              View Details
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mb-6">No upcoming events</p>
      )}

      <h2 className="text-2xl font-semibold mb-4">Completed Events</h2>
      {completedEventList?.length > 0 ? (
        completedEventList.slice(0, 3).map((event) => (
          <div
            key={event._id}
            className="bg-[rgba(0,0,0,0.05)] border border-gray-300 p-4 rounded-lg mb-6"
          >
            <p>
              <strong>Event:</strong> {event.title}
            </p>
            <p>
              <strong>Date:</strong> {event.eventDateTime.split(" ")[0]}
            </p>
            <p>
              <strong>Location:</strong> {event.eventLocation}
            </p>
            <Link to={`/event/${event._id}`} className="text-blue-600">
              View Details
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mb-2">No completed events</p>
      )}
    </div>
  );
};

export default Dashboard;
