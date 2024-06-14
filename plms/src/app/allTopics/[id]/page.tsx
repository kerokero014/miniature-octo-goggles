'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

//file imports
import NoteCard from '../../components/NoteCard';
import Topic from '../../Data/Topic.model';
import MainFooter from '@/app/components/MainFooter';
import MainHeader from '@/app/components/MainHeader';
import StaticBg from '@/app/components/StaticBg';
import NoteModalForm from '../../components/NoteModalForm';
import Note from '../../Data/Note.model';

export default function TopicPage() {
  const { id } = useParams(); // Correctly use useParams from next/navigation
  const [topic, setTopic] = useState<Topic | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleNoteCreated = (newNote: Note) => {
    if (topic) {
      setTopic({ ...topic, notes: [...topic.notes, newNote] });
    }
  };

  if (!topic) {
    return <div className="flex items-center justify-center p-4 text-blue-500">Loading...</div>;
  }

  return (
    <>
      <MainHeader />
      <StaticBg />
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">{topic.title}</h1>
        </div>
        <div>
          <button
            className="mb-4 rounded bg-violet-700 px-4 py-2 text-white"
            onClick={() => setShowModal(true)}
          >
            Add Note
          </button>
          {topic.notes.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topic.notes.map((note) => (
                <NoteCard key={note.note_id} note={note} />
              ))}
            </div>
          ) : (
            <p className="mt-2 text-gray-600">No notes available.</p>
          )}
        </div>
        {showModal && (
          <NoteModalForm
            topicId={topic.topic_id}
            onClose={() => setShowModal(false)}
            onNoteCreated={handleNoteCreated}
          />
        )}
      </div>
      <MainFooter />
    </>
  );
}
