import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const TaskDetails = ({ tasks, onToggleSubtask }) => {
  const { id } = useParams();
  const task = tasks.find(task => task.id === id);
  const navigate = useNavigate();

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleSubtaskCheckboxClick = (subtaskIndex) => {
    onToggleSubtask(task.id, subtaskIndex);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <button onClick={() => navigate(-1)} className="mb-4 p-2 bg-red-700 hover:bg-red-900 text-white rounded">Back</button>
      <h2 className="text-3xl font-bold mb-4">{task.name}</h2>
      {task.dueDate && (
        <div className="text-lg mb-4">Due: {format(parseISO(task.dueDate), 'MM/dd/yyyy')}</div>
      )}
      <div className="text-lg mb-4">Priority: {task.priority}</div>
      <div className="text-lg mb-4">Notes: {task.notes}</div>
      {task.subtasks && task.subtasks.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-2">Subtasks</h3>
          <ul>
            {task.subtasks.map((subtask, index) => (
              <li key={index} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={() => handleSubtaskCheckboxClick(index)}
                  className="mr-2"
                />
                <span className={`text-lg ${subtask.completed ? 'line-through text-gray-500' : ''}`}>
                  {subtask.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
