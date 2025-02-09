import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { convertToDate, formatDate } from "../utils/dateFormat";

const Events = () => {
  const [eventData, setEventData] = useState(null);

  const sortedEvents = eventData?.sort((a, b) => {
    const statusA = formatDate(a.eventDateTime);
    const statusB = formatDate(b.eventDateTime);

    const dateA = convertToDate(a.eventDateTime);
    const dateB = convertToDate(b.eventDateTime);

    if (statusA === "Upcoming" && statusB === "Passed") return -1; // Upcoming first
    if (statusA === "Passed" && statusB === "Upcoming") return 1; // Passed last

    return dateA - dateB;
  });

  async function fetchEvents() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/event/display_events`
        // { withCredentials: true }
      );

      setEventData(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col gap-6 bg-white w-full max-w-[1400px] mx-auto p-6 lg:px-4">
      {/* Search */}
      <header className="flex justify-between items-baseline">
        <h1 className="mb-5 text-xl">All Events</h1>
        <form className="flex gap-2">
          <input
            type="text"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300 text-sm"
            placeholder="Search Event"
          />
          <button className="px-4 py-2 rounded-md cursor-pointer bg-white border border-[rgba(0,0,0,0.1)] text-sm">
            Search
          </button>
        </form>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {eventData &&
          eventData.map((data) => <Card key={data?._id} data={data} />)}
      </div>
    </div>
  );
};

export default Events;
