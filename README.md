
# Eventify - Event Management Application

Eventify is a modern event management application where users can view upcoming events, create events, and manage their profiles. It provides a seamless experience for event organizers and attendees, with features for login, signup, event creation, and profile management.

## Features

- **User Authentication**: Login and Signup functionality.
- **Event Management**: View and create events.
- **Profile Management**: Users can view and update their profiles.
- **Responsive Design**: Fully responsive layout, optimized for all screen sizes.
- **Private Routes**: Users must be authenticated to access certain pages (like creating events and viewing the profile).

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB (if applicable)
- **Authentication**: Firebase Authentication or custom JWT authentication
- **Deployment**: Vercel (for frontend), Heroku (for backend) or any preferred hosting platform

## Installation

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/eventify.git
cd eventify
```

### Install Dependencies

Install the required dependencies for the frontend:

```bash
npm install
```

or, if you are using yarn:

```bash
yarn install
```


### Running the Application Locally

To run the project locally, use the following command:

```bash
npm start
```

This will start the development server on [http://localhost:3000](http://localhost:3000). You can now open the application in your browser.

### Backend Setup (if applicable)

If you're using a backend (Node.js/Express), navigate to the backend directory and follow these steps:

```bash
cd backend
npm install
npm start
```

## Deployment

The project is deployed on **Vercel** at:

[**Live Demo**](https://eventify.vercel.app)

## Usage

- **Login / Signup**: Users can log in or sign up using their email and password.
- **Events**: View the list of events and create new events (only accessible for logged-in users).
- **Profile**: View and update the user's profile details.
- **Navigation**: The navigation bar contains links for events, creating events, and profile management. If the user is not logged in, they will only see the Login and Signup links.

