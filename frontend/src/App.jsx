import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import TaskList from "./components/TaskList.jsx";
import API from "./services/TaskApi.js";
import AddTaskForm from "./components/AddTaskForm.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("None");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await API.get("/");
      setTasks(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => {
      if (filter === "Pending") {
        return !task.isCompleted;
      }

      if (filter === "Completed") {
        return task.isCompleted;
      }

      return true;
    });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.isCompleted).length;

  const pendingTasks = tasks.filter((task) => !task.isCompleted).length;
  const sortedTasks = [...filteredTasks];

  if (sortBy === "Priority") {
    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    sortedTasks.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority],
    );
  }

  if (sortBy === "DueDate") {
    sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Tasks...</h2>;
  }

  return (
    <>
      <Header />
      <div className="task-stats">
        <p>Total: {totalTasks}</p>
        <p>Pending: {pendingTasks}</p>
        <p>Completed: {completedTasks}</p>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("All")}>All</button>

        <button onClick={() => setFilter("Pending")}>Pending</button>

        <button onClick={() => setFilter("Completed")}>Completed</button>
      </div>

      <div className="filters">
        <button onClick={() => setSortBy("None")}>No Sort</button>

        <button onClick={() => setSortBy("Priority")}>Sort by Priority</button>

        <button onClick={() => setSortBy("DueDate")}>Sort by Due Date</button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search by task title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "90%",
          maxWidth: "500px",
          padding: "10px",
          margin: "10px auto",
          display: "block",
          borderRadius: "8px",
        }}
      />

      <AddTaskForm fetchTasks={fetchTasks} />

      <TaskList tasks={sortedTasks} />
    </>
  );
}

export default App;
