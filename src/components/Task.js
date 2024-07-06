import React from 'react';

const Task = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-gray-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-2"
        />
        <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.name}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="p-2 bg-red-700 hover:bg-red-900 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
