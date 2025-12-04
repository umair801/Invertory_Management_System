const express = require("express");
const mongoose = require("mongoose");
const i18next = require("i18next");
const backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");
const app = express();
const port = 3000;
require("dotenv").config();

console.log(process.env.MONGODB_URI);
const booksRouter = require("./routes/books.routes");


i18next.use(backend).use(middleware.LanguageDetector).init({
  fallbackLng: "en",
  backend: {
    loadPath: "./locales/{{lng}}.json",
  },
});


// Add middleware
app.use(middleware.handle(i18next));
app.use(express.json());
app.use("/books", booksRouter);



// Connect to MongoDB
const connectionString = process.env.MONGODB_URI;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start server only after DB connection succeeds
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    // Don't exit immediately, let server still run without DB
    app.listen(port, () => {
      console.log(`Server is running on port ${port} (without MongoDB)`);
    });
  });
