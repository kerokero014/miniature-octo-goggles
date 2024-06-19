// src/app/allTopics/[id]/links/page.tsx

'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import LinkModalForm from '../../../components/LinkModalForm';
import Link from '../../../Data/Link.model';

export default function LinksPage() {
  const { id } = useParams();
  const [links, setLinks] = useState<Link[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchLinks = async () => {
        try {
          const response = await fetch(`/api/topic/${id}/links`);
          if (!response.ok) {
            throw new Error('Failed to fetch links');
          }
          const data = await response.json();
          setLinks(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchLinks();
    }
  }, [id]);

  const handleLinkCreated = (newLink: Link) => {
    setLinks((prevLinks) => [...prevLinks, newLink]);
    setShowModal(false);
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Links</h1>
      <button
        onClick={() => setShowModal(true)}
        className="my-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add New Link
      </button>
      {showModal && (
        <LinkModalForm
          topicId={Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10)}
          onClose={() => setShowModal(false)}
          onLinkCreated={handleLinkCreated}
        />
      )}
      {links.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <div
              key={link.link_id}
              className="rounded-lg border-4 border-blue-300 bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:-rotate-1 hover:border-blue-500 hover:shadow-lg"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {link.url}
              </a>
              <p className="mt-2 text-gray-800">{link.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(link.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-gray-600">No links available.</p>
      )}
    </div>
  );
}
