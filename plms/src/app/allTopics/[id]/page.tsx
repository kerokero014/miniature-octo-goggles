'use client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Note from '../../Data/Note.model';

interface Topic {
  topic_id: number;
  title: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  notes: Note[];
}

export default function TopicPage() {
  const router = useRouter();
  const { id } = router.query;
  const [topic, setTopic] = useState<Topic | null>(null);

  useEffect(() => {
    if (id) {
      const fetchTopic = async () => {
        try {
          const response = await fetch(`/api/topic/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch topic');
          }
          const data = await response.json();
          setTopic(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchTopic();
    }
  }, [id]);

  if (!topic) {
    return <div className="flex items-center justify-center p-4 text-blue-500">Loading...</div>;
  }

  return (
    <div className="mx-auto flex max-w-sm items-center space-x-4 rounded-xl bg-white p-6 shadow-md">
      <div className="flex-shrink-0">
        <h1 className="text-xl font-semibold text-gray-900">{topic.title}</h1>
        <p className="mt-2 text-gray-600">{topic.description}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
        {topic.notes.length > 0 ? (
          <ul className="mt-2 list-inside list-disc text-gray-600">
            {topic.notes.map((note) => (
              <li key={note.note_id}>{note.note_content}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-600">No notes available.</p>
        )}
      </div>
    </div>
  );
}
