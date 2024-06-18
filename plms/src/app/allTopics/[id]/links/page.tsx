// src/app/allTopics/[id]/links/page.tsx

'use client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LinkCard from '../../../components/LinkCard';
import LinkModalForm from '../../../components/LinkModalForm';
import  Link  from '../../../Data/Link.model'; // Import the Link interface

interface LinksPageProps {
  params: { id: string };
}

export default function LinksPage({ params }: LinksPageProps) {
  const { id } = params; // Get id from props
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

  const handleLinkDeleted = (linkId: number) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.link_id !== linkId));
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Links</h1>
        <button
          className="mb-4 rounded bg-blue-600 px-4 py-2 text-white"
          onClick={() => setShowModal(true)}
        >
          Add Link
        </button>
      </div>
      <div>
        {links.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <LinkCard key={link.link_id} link={link} onDelete={handleLinkDeleted} />
            ))}
          </div>
        ) : (
          <p className="mt-2 text-gray-600">No links available.</p>
        )}
      </div>
      {showModal && (
        <LinkModalForm
          topicId={parseInt(id, 10)} // Ensure id is a string before parsing
          onClose={() => setShowModal(false)}
          onLinkCreated={handleLinkCreated}
        />
      )}
    </div>
  );
}
