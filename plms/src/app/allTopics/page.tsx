// src/app/allTopics/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '../components/MainFooter';
import Header from '../components/SecondaryHeader';
import AllTopics from '../components/AllTopics'; // Ensure correct import
import CreateTopicForm from '../components/createTopicForm';
import StaticBg from '../components/StaticBg';

interface Topic {
  topic_id: number;
  title: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export default function Page() {
  const [showForm, setShowForm] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [userId] = useState(1);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const response = await fetch('/api/topic');
        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }
        const fetchedTopics = await response.json();
        setTopics(fetchedTopics);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error('An unexpected error occurred', error);
        }
      }
    };
    loadTopics();
  }, []);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleTopicCreated = (newTopic: Topic) => {
    setTopics((prevTopics) => [...prevTopics, newTopic]);
    setShowForm(false);
  };

  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-7">
        <StaticBg />
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <Header />
          <main className="my-8 flex min-h-80 flex-col items-center justify-center">
            <AllTopics topics={topics} setTopics={setTopics} />
            <div>
              <button
                className="mt-4 rounded-full bg-blue-100 p-4 text-white shadow-lg transition-colors duration-200 hover:bg-slate-400"
                onClick={handleClick}
              >
                <Image src="/imgs/add_icon.png" alt="Add a new topic" width={34} height={34} />
              </button>
              {showForm && (
                <CreateTopicForm
                  user_id={userId}
                  onClose={handleClose}
                  onTopicCreated={handleTopicCreated}
                />
              )}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
