import express, { urlencoded } from "express";
import connectDB from "./db/connection.js";
import dotenv from "dotenv";
import path from "path";  // Import the path module
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import { fileURLToPath } from "url";

dotenv.config();

// Connect DB
connectDB();

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: ["http://localhost:5173", "https://job-hunt-rbtj.vercel.app"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
