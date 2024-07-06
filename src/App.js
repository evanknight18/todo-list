import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });
  const isInitialMount = useRef(true); // Ref to track initial mount

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    console.log('Loaded tasks from local storage:', storedTasks);
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        console.log('Parsed tasks:', parsedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing stored tasks:', error);
      }
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false; // After the initial mount, set it to false
    } else {
      try {
        const tasksString = JSON.stringify(tasks);
        console.log('Saving tasks to local storage:', tasksString);
        localStorage.setItem('tasks', tasksString);
      } catch (error) {
        console.error('Error saving tasks to local storage:', error);
      }
    }
  }, [tasks]);

  // Save dark mode state to local storage whenever it changes
  useEffect(() => {
    console.log('Saving dark mode to local storage:', isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Function to add a new task
  const addTask = (taskName) => {
    const newTask = {
      id: uuidv4(),
      name: taskName,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Filter tasks based on the current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'pending') {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className={`App container mx-auto p-4 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header />
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 bg-black hover:bg-red-900 text-white rounded"
        >
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
      </div>
      <AddTask onAdd={addTask} />
      <div className="flex justify-center mb-4">
        <button onClick={() => setFilter('all')} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded mr-2">All</button>
        <button onClick={() => setFilter('completed')} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded mr-2">Completed</button>
        <button onClick={() => setFilter('pending')} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded">Pending</button>
      </div>
      <TaskList tasks={filteredTasks} onToggle={toggleTaskCompletion} onDelete={deleteTask} />
      <Footer />
    </div>
  );
};

export default App;
