import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const kBaseURL = import.meta.env.VITE_BASE_URL;
// console.log("Base URL:", kBaseURL);

// Transform API response to match frontend
const taskApiToJson = (task) => {
  const { id, title, is_complete } = task;
  return { id, title, isComplete: is_complete };
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on first render
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${kBaseURL}/tasks`);
        const converted = response.data.map(taskApiToJson);
        setTasks(converted);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Update complete/incomplete
  const updateTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const endpoint = task.isComplete ? 'mark_incomplete' : 'mark_complete';
    try {
      const response = await axios.patch(`${kBaseURL}/tasks/${id}/${endpoint}`);
      const updated = taskApiToJson(response.data.task);

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${kBaseURL}/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Add new task
  const addTask = async (title) => {
    try {
      const response = await axios.post(`${kBaseURL}/tasks`, { title });
      const newTask = taskApiToJson(response.data.task);
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada's Task List</h1>
      </header>
      <main>
        <NewTaskForm onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onToggleComplete={updateTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
};

export default App;