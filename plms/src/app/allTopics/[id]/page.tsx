'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import NoteCard from '../../components/NoteCard';
import Topic from '../../Data/Topic.model';
import MainFooter from '@/app/components/MainFooter';
import MainHeader from '@/app/components/MainHeader';
import StaticBg from '@/app/components/StaticBg';

export default function TopicPage() {
  const { id } = useParams(); // Correctly use useParams from next/navigation
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
    <>
      <MainHeader />
      <StaticBg />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold leading-tight text-gray-900">{topic.title}</h1>
        </div>
        <div>
          <h2 className="mb-6 text-3xl font-semibold text-gray-900">Notes</h2>
          {topic.notes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {topic.notes.map((note) => (
                <NoteCard key={note.note_id} note={note} />
              ))}
            </div>
          ) : (
            <p className="mt-2 text-lg text-gray-600">No notes available.</p>
          )}
        </div>
      </div>
      <MainFooter />
    </>
  );
}
