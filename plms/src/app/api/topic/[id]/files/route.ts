// src/app/api/topic/[id]/files/route.ts
import { NextResponse } from 'next/server';
import { Request } from 'express';
import prisma from '../../../../../../prisma/client';
import { bufferToBase64 } from '../../../../utils/index';
import multer from 'multer';

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


