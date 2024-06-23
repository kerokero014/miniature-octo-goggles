import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const imageId = parseInt(id, 10);

    // Check if the image exists
    const existingImage = await prisma.images.findUnique({
      where: { image_id: imageId }
    });

    if (!existingImage) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Delete the image
    await prisma.images.delete({
      where: { image_id: imageId }
    });

    return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
