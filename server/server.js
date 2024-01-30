const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config()

const PORT = process.env.PORT || 5000;
const task = require("./routes/task")
 
 
mongoose
.connect(process.env.MONGO_URI, {useUnifiedTopology: true,useNewUrlParser: true,})
.then(() => {console.log("Connected to MongoDB");})
.catch((err) => {console.error("MongoDB connection error:", err);});
 

//MiddleWares
app.use(task);

 
//Middleware for health check
app.use("/", async (req, res) => {
  try {await mongoose.connection.db.command({ ping: 1 });res.json({status: "Database is healthy",health: "API Server is up & running",});
  } catch (error) {console.error("Database is not healthy:", error);res.status(500).json({ status: "Database is not healthy", error: error.message });}
});
 
 
app.listen(PORT, () => {
  console.log(`CONNECT Server is running on http://localhost:${PORT}`);
});