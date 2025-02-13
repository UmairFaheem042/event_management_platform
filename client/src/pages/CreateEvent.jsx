import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audienceType: "",
    eventMode: "",
    location: "",
    contact: "",
    date: "",
    time: "",
    price: 0,
    quantity: 100,
    sponsors: "",
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  function resetForm() {
    setFormData({
      title: "",
      description: "",
      audienceType: "",
      eventMode: "",
      location: "",
      contact: "",
      date: "",
      time: "",
      price: 0,
      quantity: 100,
      sponsors: "",
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  }

  async function createEvent(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (image) {
        formDataToSend.append("image", image);
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/event/create_event`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      resetForm();
      navigate("/my_events");
    } catch (error) {
      console.error(
        "Event Creation Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-5 items-center justify-center">
      <h1 className="text-2xl font-semibold">Create Event</h1>
      <form
        className="max-w-[500px] w-full  flex flex-col gap-5 px-4 lg:p-0 mb-6"
        onSubmit={createEvent}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-gray-500 font-medium text-sm">
            Event Name
          </label>
          <input
            type="text"
            id="title"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            placeholder="Umair"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-gray-500 font-medium text-sm"
          >
            Description
          </label>
          <textarea
            type="text"
            id="lastName"
            className="border min-h-[100px] border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            placeholder="Describe your event"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="banner" className="text-gray-500 font-medium text-sm">
            Banner
          </label>
          <input
            type="file"
            id="banner"
            value={formData.email}
            className="border border-gray-200 outline-none rounded p-2 
                   file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                   file:text-sm file:font-semibold file:bg-green-50 
                   file:text-green-700 hover:file:bg-green-100"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label
            htmlFor="location"
            className="text-gray-500 font-medium text-sm"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            placeholder="Type full address"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="date" className="text-gray-500 font-medium text-sm">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="time" className="text-gray-500 font-medium text-sm">
            Time
          </label>
          <input
            type="time"
            id="time"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-gray-500 font-medium text-sm">
            Event Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="eventType"
                className="border border-gray-200 outline-none rounded p-2"
                value="private"
                checked={formData.audienceType === "private"}
                onChange={(e) =>
                  setFormData({ ...formData, audienceType: e.target.value })
                }
                required
              />
              Private
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="eventType"
                className="border border-gray-200 outline-none rounded p-2"
                value="public"
                checked={formData.audienceType === "public"}
                onChange={(e) =>
                  setFormData({ ...formData, audienceType: e.target.value })
                }
                required
              />
              Public
            </label>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label className="text-gray-500 font-medium text-sm">
            Event Mode
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="eventMode"
                className="border border-gray-200 outline-none rounded p-2"
                value="in person"
                checked={formData.eventMode === "in person"}
                onChange={(e) =>
                  setFormData({ ...formData, eventMode: e.target.value })
                }
                required
              />
              In Person
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="eventMode"
                className="border border-gray-200 outline-none rounded p-2"
                value="virtual"
                checked={formData.eventMode === "virtual"}
                onChange={(e) =>
                  setFormData({ ...formData, eventMode: e.target.value })
                }
                required
              />
              Virtual
            </label>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label htmlFor="price" className="text-gray-500 font-medium text-sm">
            Ticket Price
          </label>
          <input
            type="number"
            id="price"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label
            htmlFor="quantity"
            className="text-gray-500 font-medium text-sm"
          >
            Ticket Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            required
            min={0}
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label
            htmlFor="sponsors"
            className="text-gray-500 font-medium text-sm"
          >
            Sponsors
          </label>
          <input
            type="text"
            id="sponsors"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            value={formData.sponsors}
            onChange={(e) =>
              setFormData({ ...formData, sponsors: e.target.value })
            }
          />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <label
            htmlFor="contact"
            className="text-gray-500 font-medium text-sm"
          >
            Contact
          </label>
          <input
            type="string"
            id="contact"
            className="border border-gray-200 outline-none rounded p-2 placeholder:text-gray-300"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          className={`text-sm font-medium bg-green-400 text-white transition-all px-6 py-3 rounded-md ${
            loading ? "disabled opacity-50" : "cursor-pointer"
          }`}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
