# PokeVault

Greetings! If you love Pokemon then you have come to the right place.

![Alt Text](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWRvd2Z5bHZyNG5xM3VhcTlwZTIxNXBzc3Nhdm0wMm5hMWVxand0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xx0JzzsBXzcMK542tx/giphy.gif)

PokeVault is a full-stack MERN web application that allows users to log in, search for Pokemon, and save their favorite Pokemon. The app provides a sleek, interactive UI with authentication and persistent storage for user favorites.

## Features

1. **User Authentication**

   - Users can register for an account.
   - Login securely using email and password.
   - Authentication is handled using JWT (JSON Web Tokens).

2. **Pokemon Search**

   - Users can search for Pokemon using the [PokeAPI](https://pokeapi.co/?ref=public-apis).
   - [Pokedex Promise v2](https://github.com/PokeAPI/pokedex-promise-v2) is used to fetch Pokemon info with auto caching.
   - Display Pokemon details including **name**, **type**, **height**, **weight**, and **evolution chain**.

3. **Favorites Vault**

   - Users can save Pokemon to their personal vault.
   - The vault lists all favorited Pokemon with their details.
   - Users can remove Pokemon from their vault at any time.

4. **Responsive UI with Animations**

   - Styled with [Tailwind CSS](https://tailwindcss.com/) for a modern design.
   - Smooth animations using [Framer Motion](https://motion.dev/).
   - Mobile-friendly layout for an optimal experience.

5. **Backend API**

   - Express.js with RESTful endpoints.
   - Database managed using MongoDB with Mongoose.
   - Secure endpoints that require authentication

6. **Error Handling & Loading States**

   - Displays error messages for invalid login and registration attempts.
   - Loading indicators for user interactions, and API requests.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB

### Installation

Clone the repository

```
# Clone the repository
git clone https://github.com/hasanfarhan33/pokemon-web-app.git
cd pokemon-web-app

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

Create a MongoDB server

### Environment Variables

Create a `.env` file in the `backend` directory with the following:

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Application

Make sure you are in the `backend` directory

```
# Start the backend server
cd backend
npm run dev
```

Go to the `frontend` directory

```
# Start the frontend server
cd backend
npm start
```

## Known Bugs 🐛

Here are the following bugs that I have encountered during development:

1. After removing the Pokemon from the vault, the conditional "Add to Vault" button doesn't get updated. It should say "Add to Vault" but it says "Already in Vault" instead. I think it is because the favorites array isn't being updated in the global state at Vault Page after removing the Pokemon from the vault.
