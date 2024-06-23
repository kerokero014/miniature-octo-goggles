// src/app/allTopics/[id]/files/page.tsx

'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import FileModalForm from '../../../components/FileModalForm';
import FileModel from '../../../Data/File.model';
import MainHeader from '@/app/components/MainHeader';
import MainFooter from '@/app/components/MainFooter';

export default function FilesPage() {
  const { id } = useParams();
  const [files, setFiles] = useState<FileModel[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`/api/topic/${id}/files`);
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    if (id) {
      fetchFiles();
    }
  }, [id]);

  const handleFileCreated = (newFile: FileModel) => {
    setFiles((prevFiles) => [...prevFiles, newFile]);
  };

  return (
    <>
      <MainHeader />
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Files</h1>
        <button
          className="my-4 rounded-md bg-blue-600 px-4 py-2 text-white"
          onClick={() => setShowModal(true)}
        >
          Upload New File
        </button>
        {files.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <div key={file.file_id} className="rounded-lg border bg-white p-4 shadow-sm">
                <a
                  href={file.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {file.file_name}
                </a>
                <p className="mt-2 text-gray-800">{file.file_type}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {new Date(file.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-gray-600">No files available.</p>
        )}
        {showModal && (
          <FileModalForm
            topicId={parseInt(Array.isArray(id) ? id[0] : id, 10)}
            onClose={() => setShowModal(false)}
            onFileCreated={handleFileCreated}
          />
        )}
      </div>
      <MainFooter />
    </>
  );
}
