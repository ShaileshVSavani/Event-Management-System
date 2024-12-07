import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';


const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center pt-28">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Go Home
          </Link>
        </div>

        {/* Profile Info Section */}
        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{user ? user.name : 'Guest'}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{user ? user.email : 'Not Logged In'}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Joined On:</span>
            <span>{user ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={logout}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
