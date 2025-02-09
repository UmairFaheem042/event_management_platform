import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../utils/dateFormat";

const EventPage = () => {

  
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [eventStatus, setEventStatus] = useState("Upcoming");

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
    }
  }

  async function getEventDetails() {
    window.scrollTo(0,0)
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/event/display_single_event/${eventId}`
      );

      const event = response.data.data;
      setEventData(event);

      const status = formatDate(event.eventDateTime);
      setEventStatus(status);

      if (event.attendees.includes(userData?._id)) {
        isRegistered(true);
      }
    } catch (error) {
      console.error(`Failed to fetch event with Id: ${eventId}:`, error);
    }
  }

  async function enrollEvent() {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/event/enroll_event/${eventId}`,
        {},
        { withCredentials: true }
      );

      setIsRegistered(true);
    } catch (error) {
      console.log("Unable to Enroll", error.response?.data || error.message);
      navigate("/signin");
    }
  }

  async function deleteEvent() {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/v1/event/delete_event/${eventId}`,
        { withCredentials: true }
      );

      // alert("Event deleted successfully!");
      navigate("/my_events"); // Redirect to events page after deletion
    } catch (error) {
      console.error(
        "Failed to delete event:",
        error.response?.data || error.message
      );
    }
  }

  useEffect(() => {
    fetchUser();
    getEventDetails();
  }, [isRegistered]);

  return (
    <div className="flex flex-col flex-1 bg-white w-full max-w-[1400px] mx-auto p-6 lg:px-4">
      <div className="flex flex-col gap-2 rounded-md p-6 w-full lg:max-w-[80%] mx-auto">
        {(userData.length !== 0 && userData?._id === eventData?.hostName) && (
          <button
            onClick={deleteEvent}
            className="bg-red-500 text-white p-2 w-fit rounded-md px-6 py-2 mt-4 cursor-pointer"
          >
            Delete Event
          </button>
        )}

        <img
          src={eventData?.image}
          className="h-[300px] md:h-[350px] lg:h-[450px] w-full object-cover border border-gray-300 rounded-md"
          alt="Event Image"
        />
        <h1 className="text-3xl font-bold mt-4">{eventData?.title}</h1>
        <p className="text-sm text-gray-400">
          Date & Time:{" "}
          <span className="font-medium text-black">
            {eventData?.eventDateTime.split(" ")[0]},{" "}
            {eventData?.eventDateTime.split(" ")[1]}
          </span>
        </p>
        <p className="text-sm text-gray-400">
          <span>Location: </span>
          <span className="font-medium text-black">
            {eventData?.eventLocation}
          </span>
        </p>
        <p className="text-sm text-gray-400">
          <span>About the Event: </span>
          <span className="block font-medium text-black">
            {eventData?.description}
          </span>
        </p>

        <div className="text-sm text-gray-400">
          Event Mode:{" "}
          <span className="font-medium text-black">
            {eventData?.eventMode
              ?.split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </span>
        </div>

        <div className="text-sm text-gray-400">
          Sponsors:{" "}
          <span className="font-medium text-black">
            {eventData?.sponsors
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <div className="w-[250px] flex flex-col border-2 border-green-600 rounded-md p-4 bg-green-200">
            <span className="text-sm">Entry Fee</span>
            <span className="text-right text-2xl w-full font-semibold">
              {eventData?.ticketPrice === 0
                ? "Free Entry"
                : eventData?.ticketPrice}
            </span>
          </div>
          <div className="w-[250px] flex flex-col border-2 border-pink-600 rounded-md p-4 bg-pink-200">
            <span className="text-sm">Enrolled</span>
            <span className="text-right text-2xl w-full font-semibold">
              {eventData?.attendees.length}/{eventData?.ticketQuantity}
            </span>
          </div>
        </div>

        {eventStatus === "Passed" ? (
          <>
            <div className="flex items-center justify-center">
              <button className="bg-red-500 text-white p-2 w-fit rounded-md px-6 py-2 mt-4">
                Event Has passed
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <button
                onClick={() => {
                  if (
                    !eventData?.attendees.includes(userData?._id) &&
                    userData._id !== eventData?.hostName
                  ) {
                    enrollEvent();
                  }
                }}
                className={`bg-green-500 text-white p-2 w-fit rounded-md px-6 py-2 mt-4 ${
                  userData._id === eventData?.hostName ||
                  eventData?.attendees.includes(userData?._id)
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {userData._id === eventData?.hostName
                  ? "You are the Host"
                  : eventData?.attendees.includes(userData?._id)
                  ? "You are Registered"
                  : "Register for the Event"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventPage;
