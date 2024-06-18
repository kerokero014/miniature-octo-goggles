//src/app/components/LinkCard.tsx

import React from 'react';
import DeleteButton from './DeleteButton';
import Link from '../Data/Link.model';

interface LinkCardProps {
  link: Link;
  onDelete: (id: number) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, onDelete }) => {
  return (
    <div className="relative rounded-lg border bg-white p-4 shadow-sm">
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
        {link.url}
      </a>
      <p className="mt-2 text-gray-800">{link.description}</p>
      <p className="mt-2 text-sm text-gray-500">{new Date(link.created_at).toLocaleString()}</p>
      <div className="absolute right-2 top-2">
        <DeleteButton id={link.link_id} entity="link" onDelete={onDelete} />
      </div>
    </div>
  );
};

export default LinkCard;
