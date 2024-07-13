import React, { useState } from 'react';
import { format, isPast, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import TaskDetailsModal from './TaskDetailsModal';

const Task = ({ task, onToggle, onDelete, onSaveNotes, onToggleSubtask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const priorityColor = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  }[task.priority];

  const isTaskOverdue = task.dueDate && isPast(parseISO(task.dueDate));

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    onToggle(task._id);
  };

  const handleSubtaskCheckboxClick = (e, subtaskIndex) => {
    e.stopPropagation();
    onToggleSubtask(task._id, subtaskIndex);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(task._id);
  };

  const handleTaskClick = (e) => {
    if (e.target.type !== 'checkbox') {
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center justify-between p-4 mb-2 ${priorityColor} text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ${isTaskOverdue ? 'border-2 border-red-500' : ''}`}
        onClick={handleTaskClick}
      >
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxClick}
            className="mr-2"
          />
          <div>
            <Link to={`/task/${task._id}`} className="text-lg">
              <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.name}
              </span>
            </Link>
            {task.dueDate && (
              <div className="text-sm">
                Due: {format(parseISO(task.dueDate), 'MM/dd/yyyy')}
              </div>
            )}
            {task.subtasks && task.subtasks.length > 0 && (
              <ul className="ml-4 mt-2">
                {task.subtasks.map((subtask, index) => (
                  <li key={index} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={(e) => handleSubtaskCheckboxClick(e, index)}
                      className="mr-2"
                    />
                    <span className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : ''}`}>
                      {subtask.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {task.labels && task.labels.length > 0 && (
              <div className="mt-2">
                {task.labels.map((label, index) => (
                  <span key={index} className="p-1 bg-blue-700 text-white rounded mr-2">
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleDeleteClick}
          className="p-2 bg-gray-800 hover:bg-gray-900 text-white rounded"
        >
          Delete
        </button>
      </div>
      <TaskDetailsModal
        task={task}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSaveNotes={onSaveNotes}
      />
    </div>
  );
};

export default Task;
