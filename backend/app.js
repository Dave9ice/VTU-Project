import "express-async-errors";
import express from "express";
import getDataRouter from "./routes/dataRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cableRouter from "./routes/cableRoutes.js";
import verifyRouter from "./routes/verifyRoutes.js";
import purchaseRouter from "./routes/purchaseRoutes.js";
import verifydocsRouter from "./routes/verifydocRoutes.js";
import meterRouter from "./routes/meterRoutes.js";
import airtimeRouter from "./routes/airtimeRoutes.js";
import monnifyRouter from "./routes/monnifyRoute.js";
import connect from "./db/connect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import xss from "xss-clean";
import mongoSanitizer from "express-mongo-sanitize";

const app = express();
// middleware
import errorHandlerMiddlware from "./middleware/errorHandlerMiddleware.js";
import notFoundMiddleWare from "./errors/not-found.js";

dotenv.config();
const corsOptions = {
  origin: [
    "https://biggiesubng.com",
    "http://localhost:5173",
    "https://www.biggiesubng.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(express.json({ type: "*/*" }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors(corsOptions));
app.set("trust proxy", 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 60 }));
app.use(helmet());
app.use(xss());
app.use(mongoSanitizer());

// app.options("/*", cors(corsOptions));
app.get("/", (req, res) => res.send("home page"));
// routes
app.use("/api/v1/data", getDataRouter);
app.use("/api/v1/cable", cableRouter);
app.use("/api/v1/verify", verifyRouter);
app.use("/api/v1/purchase", purchaseRouter);
app.use("/api/v1/airtime", airtimeRouter);
app.use("/api/v1/electricity", meterRouter);
app.use("/api/v1/verifydocs", verifydocsRouter);
app.use("/api/monnify/webhook", monnifyRouter);
app.post("/api/brevo-webhook", (req, res) => {
  const eventData = req.body;
  console.log("Received webhook event:", eventData.event);
  res.status(200).send("OK");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddlware);
const port = process.env.PORT || 5000;
const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URL);
    app.listen(5000, () => console.log(`app listenning on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

connectDB();
