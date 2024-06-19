// src/app/components/LinkModalForm.tsx

'use client';
import { useState } from 'react';
import Link from '../Data/Link.model';

interface LinkModalFormProps {
  topicId: number;
  onClose: () => void;
  onLinkCreated: (newLink: Link) => void;
}

export default function LinkModalForm({ topicId, onClose, onLinkCreated }: LinkModalFormProps) {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!url) {
      setError('URL is required');
      return;
    }

    try {
      const response = await fetch(`/api/topic/${topicId}/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, description })
      });

      if (!response.ok) {
        throw new Error('Failed to create link');
      }

      const newLink = await response.json();
      onLinkCreated(newLink);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-60">
      <div className="rounded-2xl bg-white p-8 shadow-2xl md:p-12 lg:p-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">Add a New Link</h2>
        {error && <p className="font-medium text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="url" className="block text-lg font-semibold text-gray-700">
              URL
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 p-3 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-lg font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 p-3 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
