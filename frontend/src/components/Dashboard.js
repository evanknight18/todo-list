import React from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';

const Dashboard = ({ tasks, onAdd, onToggle, onDelete, onSaveNotes, onToggleSubtask, filter, setFilter }) => {
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
    </div>
  );
};

export default Dashboard;
