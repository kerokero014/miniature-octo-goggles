//src/app/components/LinkModalForm.tsx

import React, { useState } from 'react';
import Link from '../Data/Link.model';

interface LinkModalFormProps {
  topicId: number;
  onClose: () => void;
  onLinkCreated: (link: Link) => void;
}

const LinkModalForm: React.FC<LinkModalFormProps> = ({ topicId, onClose, onLinkCreated }) => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic_id: topicId,
        url,
        description
      })
    });

    if (response.ok) {
      const newLink: Link = await response.json();
      onLinkCreated(newLink);
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Link</h3>
                <div className="mt-2">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="url">
                        URL
                      </label>
                      <input
                        id="url"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="mb-2 block text-sm font-bold text-gray-700"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        required
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                      >
                        Add Link
                      </button>
                      <button
                        type="button"
                        className="focus:shadow-outline rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkModalForm;
