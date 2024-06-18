// src/api/topic/[id]/links/route.ts

import prisma from '../../../../../../prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const links = await prisma.links.findMany({
      where: {
        topic_id: parseInt(id, 10)
      }
    });

    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
  }
}

export async function POST({ params, body }: { params?: { topic_id: string }; body: any }) {
  if (!params || !params.topic_id) {
    console.error('Params are undefined or topic_id is missing.');
    return NextResponse.json({ error: 'Params are required' }, { status: 400 });
  }

  const { topic_id } = params;
  const { url, description } = body;

  // Validation
  if (!url || !description) {
    console.error('Missing required fields (url or description).');
    return NextResponse.json(
      { error: 'Missing required fields (url or description)' },
      { status: 400 }
    );
  }

  try {
    const newLink = await prisma.links.create({
      data: {
        topic_id: parseInt(topic_id, 10),
        url,
        description
      }
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
}
