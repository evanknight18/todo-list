import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggle, onDelete, onSaveNotes }) => {
  return (
    <div className="mt-4">
      {tasks.length === 0 ? (
        <div>Loading tasks...</div>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <Task task={task} onToggle={onToggle} onDelete={onDelete} onSaveNotes={onSaveNotes} />
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
