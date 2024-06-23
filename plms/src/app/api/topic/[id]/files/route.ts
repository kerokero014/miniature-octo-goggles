// src/app/api/topic/[id]/files/route.ts
import { NextResponse } from 'next/server';
import { Request } from 'express';
import prisma from '../../../../../../prisma/client';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const files = await prisma.files.findMany({
      where: { topic_id: parseInt(id, 10) }
    });

    if (!files) {
      return NextResponse.json({ error: 'Files not found' }, { status: 404 });
    }

    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { file_name, file_data, file_type } = req.body;

  if (!file_name || !file_data || !file_type) {
    return NextResponse.json(
      { error: 'file name, file data, and file type are required' },
      { status: 400 }
    );
  }

  try {
    const newFile = await prisma.files.create({
      data: {
        topic_id: parseInt(id, 10),
        file_name,
        file_data: Buffer.from(file_data, 'base64'), // Convert base64 string to bytes
        file_type
      }
    });

    return NextResponse.json(newFile, { status: 201 });
  } catch (error) {
    console.error('Error creating file:', error);
    return NextResponse.json({ error: 'Failed to create file' }, { status: 500 });
  }
}