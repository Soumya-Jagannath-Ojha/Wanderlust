# TravelNest 

TravelNest is a full-stack web application designed to help users find the perfect stay anywhere in the world. It provides a seamless platform for users to discover, explore, and book incredible accommodations, making travel planning easy and enjoyable.

## 🚀 Features

- **User Authentication:** Secure signup and login functionality.
- **Listing Management:** Create, view, edit, and delete accommodation listings.
- **Interactive Maps:** Integration with Mapbox to display precise listing locations.
- **Image Uploads:** Cloudinary integration for smooth and scalable image hosting.
- **Reviews & Ratings:** Users can leave reviews and rate their stays.
- **Responsive Design:** Beautiful, mobile-friendly UI built with Bootstrap 5 and custom CSS.
- **Filtering:** Filter listings by categories like Trending, Beach, Castles, Rooms, etc.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Bootstrap 5, EJS (Embedded JavaScript templating)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** Passport.js
- **Map Services:** Mapbox API
- **Cloud Storage:** Cloudinary (for image uploads)

## 📦 Installation

To run TravelNest locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/TravelNest.git
   cd TravelNest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following keys:
   ```env
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAPBOX_TOKEN=your_mapbox_access_token
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   ```

4. **Initialize the Database (Optional):**
   If you want to seed the database with initial sample data:
   ```bash
   node init/index.js
   ```

5. **Start the application:**
   ```bash
   node app.js
   ```
   *Note: If you use nodemon, you can run `nodemon app.js` for hot reloading.*

6. **Open in Browser:**
   Navigate to `http://localhost:8080` (or whatever port your app is configured to run on).

## 📁 Project Structure

- `app.js` - Main entry point of the application.
- `models/` - Mongoose database schemas (User, Listing, Review).
- `routes/` - Express routers for handling different API endpoints.
- `controllers/` - Logic for handling route requests.
- `views/` - EJS templates for rendering the frontend.
- `public/` - Static assets like CSS, client-side JS, and images.
- `middleware.js` - Custom middleware functions (authentication checks, validation).
- `cloudConfig.js` - Configuration for Cloudinary image uploads.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
