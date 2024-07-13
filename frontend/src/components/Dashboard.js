import React, { useEffect, useContext, useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = ({ onAdd, onToggle, onDelete, onSaveNotes, onToggleSubtask, filter, setFilter }) => {
  const { authState, logout } = useContext(AuthContext); // Get the logout function
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/tasks', {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
        setTasks(res.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    if (authState.isAuthenticated) {
      fetchTasks();
    }
  }, [authState]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'pending') {
      return !task.completed;
    }
    return true;
  });

  const handleAddTask = async (taskData) => {
    try {
      const res = await axios.post('/api/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <div>
      <AddTask onAdd={handleAddTask} />
      <div className="flex justify-center mb-4">
        <button onClick={() => setFilter('all')} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded mr-2">All</button>
        <button onClick={() => setFilter('completed')} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded mr-2">Completed</button>
        <button onClick={() => setFilter('pending')} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded">Pending</button>
      </div>
      <TaskList tasks={filteredTasks} onToggle={onToggle} onDelete={onDelete} onSaveNotes={onSaveNotes} onToggleSubtask={onToggleSubtask} />
      <div className="flex justify-end mt-4">
        <button onClick={logout} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
