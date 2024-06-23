// src/app/api/topic/[id]/images/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../../../prisma/client';
import { bufferToBase64 } from '@/app/utils';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const images = await prisma.images.findMany({
      where: { topic_id: parseInt(id, 10) }
    });

    if (!images) {
      return NextResponse.json({ error: 'Images not found' }, { status: 404 });
    }

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    if (!req.body) {
      return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
    }

    // Cast req.body to ReadableStream<Uint8Array>
    const bodyStream = req.body as ReadableStream<Uint8Array>;

    // ReadableStream to Buffer conversion
    const chunks: Uint8Array[] = [];
    const reader = bodyStream.getReader();
    let chunk;
    while (!(chunk = await reader.read()).done) {
      chunks.push(chunk.value);
    }
    const imageBuffer = Buffer.concat(chunks);

    const newImage = await prisma.images.create({
      data: {
        topic_id: parseInt(id, 10),
        image_data: imageBuffer
      }
    });

    // Convert image_data to base64 for response (optional)
    const imageBase64 = bufferToBase64(newImage.image_data);

    return NextResponse.json({ ...newImage, image_data: imageBase64 }, { status: 201 });
  } catch (error) {
    console.error('Error creating image:', error);
    return NextResponse.json({ error: 'Failed to create image' }, { status: 500 });
  }
}
