import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model("Task", taskSchema);
