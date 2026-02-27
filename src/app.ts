import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import submissionRoutes from "./routes/submissionRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", submissionRoutes);
app.use("/uploads", express.static("uploads"));
app.use(errorHandler);

app.get("/", (_req, res) => {
  res.send("SyncField API Running 🚀");
});

export default app;
