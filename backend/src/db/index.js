import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async function () {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${DB_NAME}`,
    );

    console.log(`DB Connected ! Host : ${connectionInstance.connection.host}`);

    return connectionInstance;
  } catch (err) {
    console.log("Connection failed", err);
    process.exit(1);
  }
};

export { connectDB };
