// src/app/api/topic/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.topics.delete({
      where: { topic_id: parseInt(id, 10) }
    });
    return NextResponse.json({ message: 'Topic deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting topic:', error);
    return NextResponse.json({ error: 'Failed to delete topic' }, { status: 500 });
  }
}


// export async function GET() notes 
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const topic = await prisma.topics.findUnique({
      where: { topic_id: parseInt(id, 10) },
      include: { notes: true } // Ensure notes are included in the response
    });

    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json(topic, { status: 200 });
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
  }
}


// POST function to create a new note
