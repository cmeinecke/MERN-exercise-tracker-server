require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const exerciseRoutes = require("./routes/exercises");

// express app
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/exercises", exerciseRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
