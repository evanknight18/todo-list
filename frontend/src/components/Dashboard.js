import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AddTask from './AddTask';
import TaskList from './TaskList';
import axios from 'axios';

const Dashboard = ({ tasks, onAdd, onToggle, onDelete, onSaveNotes, onToggleSubtask, filter, setFilter, setTasks }) => {
  const { authState, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/tasks', {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
        setTasks(res.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (authState.isAuthenticated) {
      fetchTasks();
    }
  }, [authState, setTasks]);

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
    <div>
      <AddTask onAdd={onAdd} />
      <div className="flex justify-center mb-4">
        <button onClick={() => setFilter('all')} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded mr-2">All</button>
        <button onClick={() => setFilter('completed')} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded mr-2">Completed</button>
        <button onClick={() => setFilter('pending')} className="p-2 bg-red-700 hover:bg-red-900 text-white rounded">Pending</button>
      </div>
      <TaskList tasks={filteredTasks} onToggle={onToggle} onDelete={onDelete} onSaveNotes={onSaveNotes} onToggleSubtask={onToggleSubtask} />
      <button onClick={logout} className="p-2 bg-blue-700 hover:bg-blue-900 text-white rounded">Logout</button>
    </div>
  );
};

export default Dashboard;
