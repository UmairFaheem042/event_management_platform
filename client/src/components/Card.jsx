import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateFormat";

const Card = ({ data }) => {
  return (
    <Link
      to={`/event/${data._id}`}
      className="block rounded-md p-4  border border-gray-200"
    >
      <img
        alt="eventImage"
        src={data?.image}
        className="h-56 w-full rounded-md object-cover"
        loading="lazy"
      />

      <div className="mt-2">
        <dl>
          <div className="flex justify-between items-center">
            <span className="text-[0.8rem] text-gray-500">
              {data?.eventDateTime.split(" ")[0]}
            </span>
            <span className="text-[0.8rem] text-gray-500">
              {/* {data?.eventDateTime.split(" ")[1]} */}
              {formatDate(data?.eventDateTime)}
            </span>
          </div>

          <div className="mt-2">
            <span className="font-medium">{data?.title}</span>
            <p className="text-[0.75rem] text-gray-500 line-clamp-1">
              {data?.description}
            </p>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between gap-8 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center  sm:gap-2">
            {/* <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg> */}

            <div className="mt-1.5 sm:mt-0 text-center">
              <p className="text-gray-500">Price</p>

              <p className="font-medium">
                {data?.ticketPrice === 0 ? "Free Entry" : data?.ticketPrice}
              </p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            {/* <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg> */}

            <div className="mt-1.5 sm:mt-0 text-center">
              <p className="text-gray-500">Enrolled</p>

              <p className="font-medium text-gray-400">
                <span className="text-black">{data?.attendees.length}</span>/
                {data?.ticketQuantity}
              </p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            {/* <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg> */}

            <div className="mt-1.5 sm:mt-0 text-center">
              <p className="text-gray-500">Mode</p>

              <p className="font-medium">
                {data?.eventMode
                  ?.split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
