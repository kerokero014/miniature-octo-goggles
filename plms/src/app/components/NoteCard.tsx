// src/app/components/NoteCard.tsx

import React from 'react';
import Note from '../Data/Note.model';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <div className="m-2 flex w-full items-center justify-center rounded-md bg-orange-300 p-5 antialiased shadow-md transition-all duration-200 ease-in-out hover:rotate-1 hover:scale-105 hover:bg-orange-400 sm:m-4 md:m-6 lg:m-10 xl:m-12">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white p-3 shadow-sm">
        <p className="text-center font-medium text-gray-800">{note.note_content}</p>
        <div className="mt-2 text-center text-sm text-gray-600">
          Created at: {new Date(note.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
