import prisma from '../../../../prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const topics = await prisma.topics.findMany();
    return NextResponse.json(topics, { status: 200 });
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json({ error: 'Error fetching topics' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, user_id } = body;

  if (!title || !user_id) {
    return NextResponse.json({ error: 'Title and userId are required' }, { status: 400 });
  }

  try {
    const topic = await prisma.topics.create({
      data: {
        title,
        description,
        user_id: parseInt(user_id, 10)
      }
    });
    return NextResponse.json(topic, { status: 201 });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json({ error: 'Error creating topic' }, { status: 500 });
  }
}
