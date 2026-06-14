import { Router } from "express";
import {
  createTask,
  getTaskById,
  updateTask,
  getTasks,
  deleteTask,
} from "../controllers/task.controllers.js";

const router = Router();

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
