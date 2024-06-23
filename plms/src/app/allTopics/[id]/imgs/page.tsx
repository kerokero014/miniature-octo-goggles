// src/app/allTopics/[id]/images/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from '../../../Data/Image.model';
import ImageModalForm from '../../../components/ImageModalForm';
import DeleteButton from '../../../components/DeleteButton';
import MainFooter from '@/app/components/MainFooter';
import MainHeader from '@/app/components/MainHeader';

export default function ImagesPage() {
  const { id } = useParams();
  const [images, setImages] = useState<Image[]>([]);
  const [showModal, setShowModal] = useState(false);

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

  const handleImageCreated = (newImage: Image) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  const handleImageDeleted = (id: number) => {
    setImages((prevImages) => prevImages.filter((image) => image.image_id !== id));
  };

  return (
    <>
      <MainHeader />
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Images</h1>
        <button
          className="my-4 rounded-md bg-blue-600 px-4 py-2 text-white"
          onClick={() => setShowModal(true)}
        >
          Upload New Image
        </button>
        {images.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <div
                key={image.image_id}
                className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
              >
                <DeleteButton id={image.image_id} entity="image" onDelete={handleImageDeleted} />
                <img
                  src={`data:image/webp;base64,${image.image_data}`}
                  alt="Image"
                  className="h-auto w-full rounded-lg object-cover"
                />
                <p className="mt-2 text-sm font-semibold text-gray-600">
                  {new Date(image.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-gray-600">No images available.</p>
        )}
        {showModal && (
          <ImageModalForm
            topicId={Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10)}
            onClose={() => setShowModal(false)}
            onImageCreated={handleImageCreated}
          />
        )}
      </div>
      <MainFooter />
    </>
  );
}
