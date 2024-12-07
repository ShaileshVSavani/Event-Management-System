
import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { saveImageToDB } from "../../utils/IndexedDB";

const EventForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
    type: "",
  });
  const [imageFile, setImageFile] = useState(null); // For storing the selected image file
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.location ||
      !formData.maxAttendees ||
      !formData.type ||
      !imageFile
    ) {
      setError("All fields and image are required.");
      return;
    }

    try {
      const eventId = new Date().toISOString();
      const imageId = `image-${eventId}`;

      // Save image to IndexedDB
      await saveImageToDB(imageId, imageFile);

      // Save event metadata to localStorage
      const events = JSON.parse(localStorage.getItem("events")) || [];
      events.push({ ...formData, creator: user?.id, eventId, imageId });
      localStorage.setItem("events", JSON.stringify(events));

      // Reset the form
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        maxAttendees: "",
        type: "",
      });
      setImageFile(null);
      setError("");
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error saving event:", error);
      setError("Event creation failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 pt-28"
    >
      <h2 className="text-2xl font-semibold text-gray-700">Create Event</h2>
      {error && <p className="text-red-600">{error}</p>}

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      ></textarea>

      <input
        type="date"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />

      <input
        type="text"
        placeholder="Location"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />

      <input
        type="number"
        placeholder="Max Attendees"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.maxAttendees}
        onChange={(e) =>
          setFormData({ ...formData, maxAttendees: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Event Type"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      />

      <input
        type="file"
        accept="image/*"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
