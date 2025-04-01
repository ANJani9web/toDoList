import './App.css'
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaCheck } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/tasks"; // Update this when deploying

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await axios.post(API_URL, { text: newTask });
    setTasks([...tasks, res.data]);
    setNewTask("");
  };

  // Toggle task completion
  const toggleTask = async (id, completed) => {
    const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
    setTasks(tasks.map(task => (task._id === id ? res.data : task)));
  };

  // Delete a task
  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleTask(task._id, task.completed)}>
              {task.text}
            </span>
            <div className="actions">
              <FaCheck className="check" onClick={() => toggleTask(task._id, task.completed)} />
              <FaTrash className="delete" onClick={() => deleteTask(task._id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
