// src/app/components/ImageModalForm.tsx

import { useState } from 'react';
import ImageModel from '../Data/Image.model';

interface ImageModalFormProps {
  topicId: number;
  onClose: () => void;
  onImageCreated: (newImage: ImageModel) => void;
}

const ImageModalForm: React.FC<ImageModalFormProps> = ({ topicId, onClose, onImageCreated }) => {
  const [image, setImage] = useState<File | null>(null); // State to hold the selected image file
  const [imageData, setImageData] = useState<string>(''); // State to store base64 data for preview

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      setImage(selectedImage);

      // Convert image to base64 for preview (optional)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleImageUpload = async () => {
    if (image) {
      try {
        const formData = new FormData();
        formData.append('image_data', image);

        const response = await fetch(`/api/topic/${topicId}/images`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const newImage: ImageModel = await response.json();

        onImageCreated(newImage); // Update the parent component with the new image

        onClose(); // Close the modal after successful upload
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.error('Missing image file');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-4 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Upload Image</h2>
        <div className="mb-4">
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {imageData && (
            <img src={imageData} alt="Preview" className="mt-2 max-h-60 object-contain" />
          )}
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
            onClick={handleImageUpload}
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

export default ImageModalForm;
