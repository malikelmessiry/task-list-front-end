import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Mow the lawn',
      isComplete: false,
    },
    {
      id: 2,
      title: 'Cook Pasta',
      isComplete: true,
    },
  ]);
  
    // Toggle complete function
    const toggleComplete = (id) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      );
      setTasks(updatedTasks);
    };
  
    // Delete task function
    const deleteTask = (id) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Ada's Task List</h1>
        </header>
        <main>
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
          />
        </main>
      </div>
    );
  };
  
  export default App;
  

