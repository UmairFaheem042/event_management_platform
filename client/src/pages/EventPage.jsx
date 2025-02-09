import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventPage = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);

  async function getEventDetails() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/event/display_single_event/${eventId}`,
        { withCredentials: true }
      );

      // console.log(response.data);
      setEventData(response.data.data);
    } catch (error) {
      console.error(`Failed to fetch event with Id: ${eventId}:`, error);
    }
  }

  console.log(eventData);

  useEffect(() => {
    getEventDetails();
  }, []);

  return (
    <div className="flex flex-1 bg-white w-full max-w-[1400px] mx-auto p-6 lg:px-4">
      <div className="flex flex-col gap-2 rounded-md p-6 w-full lg:max-w-[80%] mx-auto">
        <img
          src={eventData?.image}
          className="h-[300px] md:h-[350px] lg:h-[450px] w-full object-cover border border-gray-300 rounded-md"
          alt="Event Image"
        />
        <h1 className="text-3xl font-bold mt-4">{eventData?.title}</h1>
        <p className="text-sm text-gray-400">
          Host: <span className="font-medium text-black">Umair</span>
        </p>
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
          <p className="font-medium text-black">{eventData?.description}</p>
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
        <div className="flex gap-2 items-center">
          <div className="w-[150px] flex flex-col border-2 border-green-600 rounded-md p-2 bg-green-200">
            <span className="text-sm">Entry Fee</span>
            <span className="text-right text-xl w-full">
              {eventData?.ticketPrice}
            </span>
          </div>
          <div className="w-[150px] flex flex-col border-2 border-pink-600 rounded-md p-2 bg-pink-200">
            <span className="text-sm">Enrolled</span>
            <span className="text-right text-xl w-full">
              {eventData?.attendees.length}/{eventData?.ticketQuantity}
            </span>
          </div>
        </div>
        <button>Register</button>
      </div>
    </div>
  );
};

export default EventPage;
