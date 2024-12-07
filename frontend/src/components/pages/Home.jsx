
import React from "react";
import EventList from "../Event/EventList";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-28">
      <header className=" text-gray-900 py-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to Event Management</h1>
          <p className="text-lg">Discover and manage upcoming events with ease.</p>
        </div>
      </header>

      <main className="flex-grow p-6">
        {/* Render the EventList component */}
        <EventList />
      </main>

      {/* Full-Width Footer */}
      <footer className="bg-gray-800 text-white py-4 w-full">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">&copy; 2024 Event Management. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
