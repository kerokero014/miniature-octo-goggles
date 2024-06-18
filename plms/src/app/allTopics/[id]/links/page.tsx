// src/app/allTopics/[id]/links/page.tsx

'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from '../../../Data/Link.model';

export default function LinksPage() {
  const { id } = useParams();
  const [links, setLinks] = useState<Link[]>([]);

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

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Links</h1>
      {links.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <div key={link.link_id} className="rounded-lg border bg-white p-4 shadow-sm">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
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
