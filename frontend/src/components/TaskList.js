import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggle, onDelete, onSaveNotes, onToggleSubtask }) => {
  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onSaveNotes={onSaveNotes}
          onToggleSubtask={onToggleSubtask}  // Pass the prop here
        />
      ))}
    </div>
  );
};

export default TaskList;
