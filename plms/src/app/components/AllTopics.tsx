// components/AllTopics.tsx

'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Topic from './Topic';

interface TopicProps {
  topic_id: number;
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

async function deleteTopic(topic_id: number) {
  const response = await fetch(`/api/topic/${topic_id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete topic');
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

  const handleDelete = async (topic_id: number) => {
    try {
      await deleteTopic(topic_id);
      setTopics(topics.filter((topic) => topic.topic_id !== topic_id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {topics.map((topic) => (
        <div className="transform transition duration-100 ease-in-out hover:-translate-y-1 hover:scale-110">
          <div className="h-full overflow-hidden rounded-lg bg-slate-800 p-1 shadow-lg hover:shadow-2xl">
            <div className="flex h-full flex-col p-6 dark:bg-violet-400">
              <Link
                href={`/allTopics/${topic.topic_id}`}
                className="block cursor-pointer font-semibold"
                passHref
              >
                <Topic
                  key={topic.topic_id}
                  topic_id={topic.topic_id}
                  title={topic.title}
                  description={topic.description}
                  onDelete={handleDelete}
                />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
