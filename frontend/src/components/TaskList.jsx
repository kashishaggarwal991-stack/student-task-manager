import API from "../services/TaskApi";

function TaskList({ tasks }) {
  console.log(tasks);
  if (tasks.length === 0) {
    return (
      <div className="task-card">
        <h2>📋 No Tasks Available</h2>
        <p>Create a task using the form above.</p>
      </div>
    );
  }
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;
    try {
      await API.delete(`/${id}`);

      alert("Task Deleted Successfully");

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Failed to delete task");
    }
  };

  const handleEdit = async (task) => {
    const newTitle = prompt("Enter new title", task.title);
    const newDescription = prompt("Enter new description", task.description);

    if (!newTitle) return;

    try {
      await API.put(`/${task._id}`, {
        title: newTitle,
        description: newDescription,
      });

      alert("Task Updated Successfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Failed to update task");
    }
  };
  const handleToggle = async (task) => {
    try {
      await API.put(`/${task._id}`, {
        isCompleted: !task.isCompleted,
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Failed to update task");
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <div className="task-card" key={task._id}>
          <h2>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleToggle(task)}
            />
            <span
              style={{
                textDecoration: task.isCompleted ? "line-through" : "none",
              }}
            >
              {task.isCompleted ? "✅" : "❌"} {task.title}
            </span>
          </h2>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>

          <button onClick={() => handleEdit(task)}>Edit</button>

          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
