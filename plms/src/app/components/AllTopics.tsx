// components/AllTopics.tsx

'use client';

import Topic from './Topic';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface TopicProps {
  id: number;
  title: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface AllTopicsProps {
  topics: TopicProps[];
  setTopics: (topics: TopicProps[]) => void;
}

async function fetchTopics() {
  const response = await fetch('/api/topic');
  if (!response.ok) {
    throw new Error('Failed to fetch topics');
  }
  return response.json();
}

export default function AllTopics({ topics, setTopics }: AllTopicsProps) {
  useEffect(() => {
    const loadTopics = async () => {
      try {
        const fetchedTopics = await fetchTopics();
        setTopics(fetchedTopics);
      } catch (error) {
        console.error(error);
      }
    };
    loadTopics();
  }, [setTopics]);

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {topics.map((topic) => (
        <div className="transform transition duration-100 ease-in-out hover:-translate-y-1 hover:scale-110">
          <div className="h-full overflow-hidden rounded-lg shadow-lg hover:shadow-2xl">
            <div className="flex h-full flex-col bg-white p-6 dark:bg-gray-800">
              <Link key={topic.id} href={`/allTopics/${topic.id}`} className="block font-semibold">
                <Topic id={topic.id} title={topic.title} description={topic.description} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
