// src/app/allTopics/[id]/files/page.tsx

'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import File from '../../../Data/File.model';

export default function FilesPage() {
  const { id } = useParams();
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (id) {
      const fetchFiles = async () => {
        try {
          const response = await fetch(`/api/topic/${id}/files`);
          if (!response.ok) {
            throw new Error('Failed to fetch files');
          }
          const data = await response.json();
          setFiles(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchFiles();
    }
  }, [id]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Files</h1>
      {files.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <div key={file.file_id} className="p-4 border rounded-lg shadow-sm bg-white">
              <a href={file.file_path} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                {file.file_name}
              </a>
              <p className="mt-2 text-gray-800">{file.file_type}</p>
              <p className="text-sm text-gray-500 mt-2">{new Date(file.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-gray-600">No files available.</p>
      )}
    </div>
  );
}
