import React, { useState, useEffect, useRef, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AuthProvider, { AuthContext } from './contexts/AuthContext';
import TaskDetails from './components/TaskDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const { authState } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });
  const isInitialMount = useRef(true);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing stored tasks:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      try {
        const tasksString = JSON.stringify(tasks);
        localStorage.setItem('tasks', tasksString);
      } catch (error) {
        console.error('Error saving tasks to local storage:', error);
      }
    }
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const addTask = ({ name, priority, dueDate, subtasks }) => {
    const newTask = {
      id: uuidv4(),
      name,
      priority,
      dueDate,
      notes: '',
      completed: false,
      subtasks
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleSubtaskCompletion = (taskId, subtaskIndex) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const updatedSubtasks = task.subtasks.map((subtask, index) => {
            if (index === subtaskIndex) {
              return { ...subtask, completed: !subtask.completed };
            }
            return subtask;
          });
          return { ...task, subtasks: updatedSubtasks };
        }
        return task;
      })
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const saveNotes = (taskId, notes) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, notes } : task
      )
    );
  };

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
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            authState.isAuthenticated ? (
              <Dashboard
                tasks={tasks}
                onAdd={addTask}
                onToggle={toggleTaskCompletion}
                onDelete={deleteTask}
                onSaveNotes={saveNotes}
                onToggleSubtask={toggleSubtaskCompletion}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/task/:id" element={<TaskDetails tasks={tasks} onToggleSubtask={toggleSubtaskCompletion} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);

export default AppWrapper;
