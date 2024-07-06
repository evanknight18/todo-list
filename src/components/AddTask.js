import React, { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onAdd({ name: task, priority, dueDate, notes });
      setTask('');
      setPriority('low');
      setDueDate('');
      setNotes('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap justify-center">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        className="p-2 w-full max-w-md border border-gray-700 bg-gray-800 text-white rounded mr-2 mb-2"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-2 bg-gray-800 text-white rounded mr-2 mb-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 bg-gray-800 text-white rounded mr-2 mb-2"
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add notes"
        className="p-2 w-full max-w-md border border-gray-700 bg-gray-800 text-white rounded mr-2 mb-2"
      />
      <button type="submit" className="p-2 bg-red-700 hover:bg-red-900 text-white rounded">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
