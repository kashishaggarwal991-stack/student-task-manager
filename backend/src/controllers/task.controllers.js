import { Task } from "../models/task.models.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      priority,
    });

    return res.status(201).json(newTask);
  } catch (err) {
    console.log("Create Task Error:", err);
    return res.status(500).json({
      message: "Task can't be created",
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({
      message: "Documents can't be fetched",
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    } else {
      return res.status(200).json(task);
    }
  } catch (err) {
    return res.status(500).json({
      message: "Couldn't fetch",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json(updatedTask);
  } catch (err) {
    return res.status(500).json({
      message: "Task couldn't be updated",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Task couldn't be deleted",
    });
  }
};
