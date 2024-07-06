import React, { useState } from 'react';
import { format, isPast, parseISO } from 'date-fns';
import TaskDetailsModal from './TaskDetailsModal';

const Task = ({ task, onToggle, onDelete, onSaveNotes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const priorityColor = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  }[task.priority];

  const isTaskOverdue = task.dueDate && isPast(parseISO(task.dueDate));

  return (
    <div>
      <div
        className={`flex items-center justify-between p-4 mb-2 ${priorityColor} text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ${isTaskOverdue ? 'border-2 border-red-500' : ''}`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="mr-2"
          />
          <div>
            <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.name}
            </span>
            {task.dueDate && (
              <div className="text-sm">
                Due: {format(parseISO(task.dueDate), 'MM/dd/yyyy')}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
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
