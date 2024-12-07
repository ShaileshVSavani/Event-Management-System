
import React, { useState, useEffect } from "react";
import { getImageFromDB } from "../../utils/IndexedDB";  // Ensure this function works correctly

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from localStorage
  useEffect(() => {
    const fetchEventsFromLocalStorage = async () => {
      // Get events from localStorage
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

      // Filter out past events based on the current date
      const currentDate = new Date();
      const upcomingEvents = storedEvents.filter((event) => new Date(event.date) >= currentDate);

      // Fetch images for each event
      const eventsWithImages = await Promise.all(
        upcomingEvents.map(async (event) => {
          if (event.imageId) {
            const imageFile = await getImageFromDB(event.imageId);
            return { ...event, imageFile };
          }
          return event;
        })
      );

      // Set events to state
      setEvents(eventsWithImages);
      setLoading(false);
    };

    fetchEventsFromLocalStorage(); // Fetch events when the component is mounted
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Upcoming Events</h2>

      {/* Event List */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading events...</p>
        ) : events.length > 0 ? (
          events.map((event) => (
            <div key={event.eventId} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="relative">
                {event.imageFile ? (
                  <img
                    src={URL.createObjectURL(event.imageFile)}
                    alt={event.title}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-300 flex items-center justify-center text-white text-xl">
                    No Image
                  </div>
                )}
                <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white w-full">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-600">{event.description}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-semibold text-gray-700">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    <strong>Type:</strong> {event.type}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">No upcoming events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
