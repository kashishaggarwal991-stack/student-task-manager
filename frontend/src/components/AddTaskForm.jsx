import { useState } from "react";
import API from "../services/TaskApi";

function AddTaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    if (!dueDate) {
      alert("Please select a due date");
      return;
    }

    try {
      await API.post("/", {
        title,
        description,
        priority,
        dueDate,
      });

      await fetchTasks();
      alert("Task Added Successfully");

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
