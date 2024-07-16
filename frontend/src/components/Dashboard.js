import React, { useEffect, useContext, useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

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

  const handleToggleTask = async (taskId) => {
    const task = tasks.find((task) => task._id === taskId);
    if (!task) return;

    try {
      const res = await axios.put(`/api/tasks/${task._id}`, { ...task, completed: !task.completed }, {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      setTasks(tasks.map((t) => (t._id === taskId ? res.data : t)));
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const handleToggleSubtask = async (taskId, subtaskIndex) => {
    const task = tasks.find((task) => task._id === taskId);
    if (!task) return;

    const updatedSubtasks = task.subtasks.map((subtask, index) => {
      if (index === subtaskIndex) {
        return { ...subtask, completed: !subtask.completed };
      }
      return subtask;
    });

    try {
      const res = await axios.put(`/api/tasks/${task._id}`, { ...task, subtasks: updatedSubtasks }, {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      setTasks(tasks.map((t) => (t._id === taskId ? res.data : t)));
    } catch (err) {
      console.error('Error toggling subtask:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleSaveNotes = async (taskId, notes) => {
    const task = tasks.find((task) => task._id === taskId);
    if (!task) return;

    try {
      const res = await axios.put(`/api/tasks/${taskId}`, { ...task, notes }, {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      });
      setTasks(tasks.map((t) => (t._id === taskId ? res.data : t)));
    } catch (err) {
      console.error('Error saving notes:', err);
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
      <TaskList tasks={filteredTasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} onSaveNotes={handleSaveNotes} onToggleSubtask={handleToggleSubtask} />
    </div>
  );
};

export default Dashboard;
