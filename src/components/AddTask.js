// src/components/AddTask.js
import React, { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onAdd(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex justify-center">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        className="p-2 w-full max-w-md border border-gray-700 bg-gray-800 text-white rounded mr-2"
      />
      <button type="submit" className="p-2 bg-red-700 hover:bg-red-900 text-white rounded">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
