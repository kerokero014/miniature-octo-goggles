// src/api/topic/[id]/links/route.ts

import prisma from '../../../../../../prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const links = await prisma.links.findMany({
      where: { topic_id: parseInt(id, 10) }
    });

    if (!links) {
      return NextResponse.json({ error: 'Links not found' }, { status: 404 });
    }

    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { url, description } = await req.json();

  try {
    const newLink = await prisma.links.create({
      data: {
        topic_id: parseInt(id, 10),
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
