import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/mongodb.js";
import appRouter from "./routes/router.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api", appRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
