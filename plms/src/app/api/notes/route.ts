import prisma from '../../../../prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic_id, note_content } = await req.json();

    if (!topic_id || !note_content) {
      return NextResponse.json(
        { error: 'Topic ID and note content are required' },
        { status: 400 }
      );
    }

    const newNote = await prisma.notes.create({
      data: {
        topic_id: parseInt(topic_id, 10),
        note_content
      }
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
}
