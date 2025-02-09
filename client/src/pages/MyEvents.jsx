import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

const MyEvents = () => {
  const [myEventData, setMyEventData] = useState(null);
  async function fetchMyEvents() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/event/display_my_events`,
        { withCredentials: true }
      );
      setMyEventData(response.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    fetchMyEvents();
  }, []);

  return (
    <div className="flex flex-col gap-6 bg-white w-full max-w-[1400px] mx-auto p-6 lg:px-4">
      <header className="flex justify-between items-baseline">
        <h1 className="mb-5 text-xl">My Events</h1>
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
        {myEventData &&
          myEventData.map((data) => <Card key={data?._id} data={data} />)}
      </div>
    </div>
  );
};

export default MyEvents;
