import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./db.js";
import authRoute from "./Routes/auth.js";
import staffRoute from "./Routes/staff.js";
import vechelesRoute from "./Routes/vecheles.js";
import reviewRoute from "./Routes/review.js"; 
import uploadRoute from "./Routes/upload.js";
import updateRoute from "./Routes/updateStat.js";
import addVechele from "./Routes/AddVechele.js"; 

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;


// Set up HTTP and Socket.io server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5000/",
      "http://localhost:80/",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});



// Dynamic CORS configuration for API routes
app.use((req, res, next) => {
  const allowedOrigins = [
      "http://localhost",
      "http://localhost:5000/",
      "http://localhost:80/",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Global CORS handling for non-Socket.io requests
app.options("*", cors()); // Preflight handling

// Routes
app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/staff", staffRoute);
app.use("/api/v1/vecheles", vechelesRoute);
app.use("/api/v1/reviews", reviewRoute); 
app.use("/api/v1/upload", uploadRoute);
app.use("/api/v1/updateStat", updateRoute); 
app.use("/api/v1/addvechele", addVechele); 


// Start server
server.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
