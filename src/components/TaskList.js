// src/components/TaskList.js
import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
