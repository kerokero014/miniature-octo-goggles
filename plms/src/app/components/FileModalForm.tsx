// src/app/components/FileModalForm.tsx
import { useState } from 'react';

interface FileModalFormProps {
  topicId: number;
  onClose: () => void;
  onFileCreated: (newFile: any) => void; // Adjust FileModel type as needed
}

const FileModalForm: React.FC<FileModalFormProps> = ({ topicId, onClose, onFileCreated }) => {
  const [fileData, setFile] = useState<File | null>(null); // State to hold the selected file
  const [fileName, setFileName] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleFileTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileType(event.target.value);
  };

  const handleFileUpload = async () => {
    if (fileData && fileName && fileType) {
      try {
        const formData = new FormData();
        formData.append('file_name', fileName);
        formData.append('file_data', fileData); // Directly append file to FormData
        formData.append('file_type', fileType);

        const response = await fetch(`/api/topic/${topicId}/files`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const newFile = await response.json();
        onFileCreated(newFile); // Notify parent component of new file creation

        onClose(); // Close modal after successful upload
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('Missing file, file name, or file type');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-4 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Upload File</h2>
        <div className="mb-4">
          <label htmlFor="file">Choose File:</label>
          <input type="file" id="file" name="file" onChange={handleFileChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="file-name">File Name:</label>
          <input
            type="text"
            id="file-name"
            name="file-name"
            value={fileName}
            onChange={handleFileNameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="file-type">File Type:</label>
          <input
            type="text"
            id="file-type"
            name="file-type"
            value={fileType}
            onChange={handleFileTypeChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
            onClick={handleFileUpload}
          >
            Upload
          </button>
          <button
            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileModalForm;
