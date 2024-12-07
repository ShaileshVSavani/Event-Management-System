
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const EventPage = () => {
  const { user } = useContext(AuthContext); // Get current user from context
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    type: "",
  });
  const [editEvent, setEditEvent] = useState(null);
  const [formError, setFormError] = useState("");
  const [viewEvent, setViewEvent] = useState(null);

  // Fetch events from localStorage
  useEffect(() => {
    const fetchEvents = () => {
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
      const updatedEvents = storedEvents.map((event) => ({
        ...event,
        attendees: event.attendees || [],
      }));
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents); // Initially show all events
    };

    fetchEvents();
  }, []);

  // Handle RSVP functionality
  const handleRsvp = (eventId) => {
    const updatedEvents = events.map((event) => {
      if (event.eventId === eventId) {
        if (!event.attendees.includes(user.id)) {
          if (event.attendees.length < event.maxAttendees) {
            event.attendees.push(user.id);
          } else {
            alert("This event has reached its max attendees.");
          }
        } else {
          alert("You have already RSVP'd to this event.");
        }
      }
      return event;
    });

    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents); // Update filtered events
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Apply filters
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...events];

      if (filters.date) {
        filtered = filtered.filter((event) => event.date === filters.date);
      }

      if (filters.location) {
        filtered = filtered.filter((event) =>
          event.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.type) {
        filtered = filtered.filter((event) =>
          event.type.toLowerCase().includes(filters.type.toLowerCase())
        );
      }

      setFilteredEvents(filtered);
    };

    applyFilters();
  }, [filters, events]);

  const handleEdit = (event) => {
    setEditEvent({ ...event });
    setFormError("");
  };

  const handleDelete = (eventId) => {
    const updatedEvents = events.filter((event) => event.eventId !== eventId);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents); // Update filtered events
  };

  const handleSaveEdit = () => {
    if (
      !editEvent.title ||
      !editEvent.description ||
      !editEvent.date ||
      !editEvent.location ||
      !editEvent.maxAttendees
    ) {
      setFormError("All fields are required!");
      return;
    }

    const updatedEvents = events.map((event) =>
      event.eventId === editEvent.eventId ? editEvent : event
    );
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents); // Update filtered events
    setEditEvent(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleView = (event) => {
    setViewEvent(event);
  };

  const handleCloseViewModal = () => {
    setViewEvent(null);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto pt-28">
      <h1 className="text-3xl font-bold mb-6 text-center">Events</h1>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-bold mb-4">Filter Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
                      className="border p-2 rounded w-full"
                      placeholder="Filter by Date"
          />
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
                      className="border p-2 rounded w-full"
                       placeholder="Filter by Location"
          />
          <input
            type="text"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
                      className="border p-2 rounded w-full"
                       placeholder="Filter by Event Type"
          />
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.eventId}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-sm">
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-sm">
                <strong>Type:</strong> {event.type || "N/A"}
              </p>
              <p className="text-sm">
                <strong>Attendees:</strong>{" "}
                {event.attendees.length}/{event.maxAttendees}
              </p>

              <div className="mt-4 flex gap-2 flex-wrap">
                {!event.attendees.includes(user.id) &&
                  event.attendees.length < event.maxAttendees && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleRsvp(event.eventId)}
                    >
                      RSVP
                    </button>
                  )}
                {event.creator === user.id && (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(event.eventId)}
                    >
                      Delete
                    </button>
                  </>
                )}
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => handleView(event)}
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No events match your filters.</p>
        )}
      </div>

      {/* View Details Modal */}
      {viewEvent && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">{viewEvent.title}</h2>
            <p>
              <strong>Description:</strong> {viewEvent.description}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(viewEvent.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Location:</strong> {viewEvent.location}
            </p>
            <p>
              <strong>Type:</strong> {viewEvent.type || "N/A"}
            </p>
            <p>
              <strong>Max Attendees:</strong> {viewEvent.maxAttendees}
            </p>
            <p>
              <strong>Attendees:</strong>{" "}
              {viewEvent.attendees.length}/{viewEvent.maxAttendees}
            </p>
            <div className="mt-6 text-right">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleCloseViewModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editEvent && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center pt-20">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
            {formError && <p className="text-red-500">{formError}</p>}
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                value={editEvent.title}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <textarea
                name="description"
                value={editEvent.description}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="date"
                name="date"
                value={editEvent.date}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="location"
                value={editEvent.location}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                name="maxAttendees"
                value={editEvent.maxAttendees}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mt-6 flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setEditEvent(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
