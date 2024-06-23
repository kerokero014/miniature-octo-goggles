// src/app/components/DeleteButton.tsx

import React from 'react';

interface DeleteButtonProps {
  id: number;
  entity: 'notes' | 'link' | 'image' | 'topic' | 'file';
  onDelete: (id: number) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, entity, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/${entity}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      onDelete(id);
    } catch (error) {
      console.error(`Error deleting ${entity}:`, error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="float-right rounded-lg bg-white px-3 py-1 text-sm text-black transition-colors duration-200 ease-in-out hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
    >
      X
    </button>
  );
};

export default DeleteButton;
