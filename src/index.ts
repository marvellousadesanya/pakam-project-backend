require("dotenv").config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import verifyJWT from "./middlewares/verifyJWT";
import credentials from "./middlewares/credentials";
import cors from "cors";

const app = express();

// const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbCon");

/* Sendgrid implementation */
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
// app.use(cors(corsOptions));

// Routes imports
import registerRouter from "./routes/account";
import loginRouter from "./routes/account";
import allAssessmentsRouter from "./routes/assessment";
import createAssessmentRouter from "./routes/assessment";
import deleteAssessmentRouter from "./routes/assessment";
import updateAsssessmentRouter from "./routes/assessment";
import getAssessmentRouter from "./routes/assessment";

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello");
});

// routes
app.use("/v1/register", registerRouter);
app.use("/v1/", loginRouter);

app.use(verifyJWT);

app.use("/v1/assessments", allAssessmentsRouter);
app.use("/v1/create", createAssessmentRouter);
app.use("/v1/", deleteAssessmentRouter);
app.use("/v1/", getAssessmentRouter);
app.use("/v1/", updateAsssessmentRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export { app };
