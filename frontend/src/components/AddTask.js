import React, { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');
  const [subtasks, setSubtasks] = useState([{ name: '', completed: false }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onAdd({ name: task, priority, dueDate, subtasks });
      setTask('');
      setPriority('low');
      setDueDate('');
      setSubtasks([{ name: '', completed: false }]);
    }
  };

  const handleSubtaskChange = (index, value) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].name = value;
    setSubtasks(newSubtasks);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { name: '', completed: false }]);
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
      <button type="button" onClick={handleAddSubtask} className="p-2 bg-blue-500 hover:bg-blue-900 text-white rounded mb-2">
        Add Subtask
      </button>
      {subtasks.map((subtask, index) => (
        <input
          key={index}
          type="text"
          value={subtask.name}
          onChange={(e) => handleSubtaskChange(index, e.target.value)}
          placeholder="Subtask"
          className="p-2 w-full max-w-md border border-gray-700 bg-gray-800 text-white rounded mr-2 mb-2"
        />
      ))}
      <button type="submit" className="p-2 bg-red-700 hover:bg-red-900 text-white rounded">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
