# ArtWise

ArtWise is a simple and interactive web application that fetches artwork data from the MET Museum API, displays detailed information about various art pieces, and allows users to explore them. The goal of the project is to create an informative and engaging platform where users can view art from museums and, in the future, get personalized recommendations based on their preferences.

---

## General Idea

This project integrates a public museum API (specifically the MET Museum API) to retrieve information about artworks like:
- **Title**
- **Artist**
- **Medium**
- **Year**
- **Image**

The backend fetches and filters the art data, and the frontend displays it in a clean and responsive layout using React and Bootstrap. While the current version focuses on fetching and displaying art, future features will include user interactions like "favoriting" artworks and creating a recommendation system based on those choices.

---

## Technologies Used

### **Backend**
- **Node.js**: Used for setting up the server and handling API requests.
- **Express**: A lightweight framework to create routes and serve the data.
- **Axios**: For making HTTP requests to the MET Museum API.
- **CORS**: Middleware to handle cross-origin requests.
- **PostgreSQL**: A database for storing user data and potential favorites (not heavily used in the current version).

### **Frontend**
- **React**: A JavaScript library for building the user interface.
- **Axios**: For calling the backend API and retrieving the art data.
- **Bootstrap**: Used for responsive styling and a clean layout.

---

## How It Works

1. **Backend**:
   - Fetches the list of object IDs from the MET Museum API.
   - Retrieves detailed artwork information for each ID (like title, artist, and image).
   - Filters out artworks without images or titles.
   - Serves this filtered list of artworks at a `/api/met-art` endpoint.

2. **Frontend**:
   - Fetches the data from the backend API (`/api/met-art`).
   - Displays each artwork in a responsive grid with Bootstrap cards.
   - Shows loading indicators while the data is being fetched.

---

## Installation and Setup

### **Prerequisites**
- Node.js
- PostgreSQL 

### **Backend Setup**
1. Clone the repository.
2. Navigate to the `backend` folder and install dependencies:
   ```bash
   cd backend
   npm install
