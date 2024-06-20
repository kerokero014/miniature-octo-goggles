'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import File from '../Data/File.model';

interface FileModalFormProps {
  topicId: number;
  onClose: () => void;
  onFileCreated: (newFile: File) => void;
}

export default function FileModalForm({ topicId, onClose, onFileCreated }: FileModalFormProps) {
  const [file, setFile] = useState<globalThis.File | null>(null); // Use the global File type
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('topic_id', topicId.toString());

    try {
      const response = await fetch(`/api/topic/${topicId}/files`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const newFile = await response.json();
      onFileCreated(newFile);
      onClose();
      router.refresh(); // Refresh the page to show the new file
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Upload a New File</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="file"
              id="file"
              name="file"
              accept=""
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
