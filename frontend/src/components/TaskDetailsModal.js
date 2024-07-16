import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // This is required for screen readers

const TaskDetailsModal = ({ task, isOpen, onRequestClose, onSaveNotes }) => {
  const [notes, setNotes] = useState(task.notes || '');

  const handleSave = () => {
    onSaveNotes(task._id, notes); // Changed `task.id` to `task._id` to match the MongoDB ObjectId format
    onRequestClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="flex items-center justify-center fixed inset-0 z-50 overflow-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-gray-800 text-white rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl mb-4">{task.name}</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-40 p-2 border border-gray-600 bg-gray-700 text-white rounded mb-4"
        />
        <button onClick={handleSave} className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded mr-2">Save</button>
        <button onClick={onRequestClose} className="p-2 bg-gray-500 hover:bg-gray-700 text-white rounded">Cancel</button>
      </div>
    </Modal>
  );
};

export default TaskDetailsModal;
