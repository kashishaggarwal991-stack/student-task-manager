import express from "express";
import cors from "cors";
const app = express();
app.use(
  express.json({
    limit: "16kb",
  }),
);

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   }),
// );

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  }),
);

import taskRoutes from "./routes/taskRoutes.js";

app.use("/api/v1/tasks", taskRoutes);

export { app };
