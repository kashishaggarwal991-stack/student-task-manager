import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5005;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening at ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDb connection failed", err);
  });
