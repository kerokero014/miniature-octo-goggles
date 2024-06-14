// src/app/components/NoteModalForm.tsx

import React, { useState } from 'react';
import Note from '../Data/Note.model';

interface NoteModalFormProps {
  topicId: number;
  onClose: () => void;
  onNoteCreated: (note: Note) => void;
}

const NoteModalForm: React.FC<NoteModalFormProps> = ({ topicId, onClose, onNoteCreated }) => {
  const [noteContent, setNoteContent] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic_id: topicId, note_content: noteContent })
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      const newNote = await response.json();
      onNoteCreated(newNote);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Add a New Note</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="mb-4 w-full rounded-lg border p-2"
            rows={5}
            placeholder="Enter note content"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 rounded-lg border px-4 py-2 text-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white">
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModalForm;
