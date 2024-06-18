// src/app/allTopics/[id]/images/page.tsx

'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from '../../../Data/Image.model';


export default function ImagesPage() {
  const { id } = useParams();
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (id) {
      const fetchImages = async () => {
        try {
          const response = await fetch(`/api/topic/${id}/images`);
          if (!response.ok) {
            throw new Error('Failed to fetch images');
          }
          const data = await response.json();
          setImages(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchImages();
    }
  }, [id]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Images</h1>
      {images.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div key={image.image_id} className="p-4 border rounded-lg shadow-sm bg-white">
              <img src={image.image_path} alt="Image" className="w-full h-auto" />
              <p className="text-sm text-gray-500 mt-2">{new Date(image.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-gray-600">No images available.</p>
      )}
    </div>
  );
}
