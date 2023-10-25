//external packages imports
const express = require("express");
const cors = require("cors");

//internal imports
const connectdb = require("./configure/connectdb.js");
const userRouter = require("./routes/user.route.js");
const exerciseRouter = require("./routes/exercise.route.js");

//configure and initialize dotenv
require("dotenv").config();

// App create using express
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);
app.use("/api/exercise", exerciseRouter);

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(200).send("<h1>Hello</h1>");
});

// Error route
app.use((req, res, next) => {
  res.status(404).send("404 Error!!!...");
});
// Server Error route
app.use((err, req, res, next) => {
  res.status(500).send("Server Error!!! Something broke..");
});

//Port
const port = process.env.PORT || 5000;

//port listen for server running
app.listen(port, async () => {
  console.log(`Serevr is running at http://localhost:${port}`);
  await connectdb();
});
