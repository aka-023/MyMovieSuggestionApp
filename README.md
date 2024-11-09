# MovieSuggestionApp

A web application that suggests movies based on user preferences. Users can search for movies, view detailed information, and add movies to a favorites list for quick access. Built with React and powered by The Movie Database API for dynamic movie data.

## Features

- **Movie Search**: Find movies by title using a search bar.
- **Detailed Movie Info**: Access comprehensive details like genre, release date, and description for each movie.
- **Favorites Management**: Save movies to a favorites list for easy retrieval.
- **Responsive Design**: Optimized for both mobile and desktop viewing.

## Tech Stack

- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (to store user favorites)
- **API**: [The Movie Database (TMDB)](https://www.themoviedb.org/)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/aka-023/MyMovieSuggestionApp.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd MyMovieSuggestionApp
   ```

### Client Setup

1. **Move to the `client` directory**:

   ```bash
   cd Client
   ```

2. **Create a `.env` file** in the root of `Client` and add your TMDB API key:

   ```plaintext
   VITE_MOVIE_API="your_TMDB_API_key"
   ```

3. **Install dependencies and start the client**:

   ```bash
   npm install
   npm run dev
   ```

### Server Setup

1. **Move to the `Server` directory**:

   ```bash
   cd ../Server
   ```

2. **Create a `.env` file** in the root of `Server` and add the following environment variables:

   ```plaintext
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/moviedb
   SECRET_KEY="yourSecretKeyToCreateJWTtoken"
   NODE_CODE_SENDING_EMAIL_ADD="your_email_address"
   NODE_CODE_SENDING_EMAIL_PASSWORD="your_google_app_password"
   ```

3. **Install dependencies and start the server**:

   ```bash
   npm install
   node index.js
   ```

### Access the Application

Once both client and server are running, open your browser and navigate to:

```plaintext
http://localhost:5173
```
