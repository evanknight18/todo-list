import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import Header from './components/Header';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
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

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'pending') {
      return !task.completed;
    }
    return true;
  });

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

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
      <ProgressBar completedTasks={completedTasks} totalTasks={totalTasks} />
      <AddTask onAdd={addTask} />
      <div className="flex justify-center mb-4">
        <button onClick={() => setFilter('all')} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded mr-2">All</button>
        <button onClick={() => setFilter('completed')} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded mr-2">Completed</button>
        <button onClick={() => setFilter('pending')} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded">Pending</button>
      </div>
      <TaskList tasks={filteredTasks} onToggle={toggleTaskCompletion} onDelete={deleteTask} onSaveNotes={saveNotes} onToggleSubtask={toggleSubtaskCompletion} />
      <Footer />
    </div>
  );
};

export default App;
