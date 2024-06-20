import { NextResponse } from 'next/server';
import multer from 'multer';
import prisma from '../../../../../../prisma/client';

const upload = multer({ dest: 'uploads/' });

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const files = await prisma.files.findMany({
      where: { topic_id: parseInt(id, 10) }
    });

    if (!files.length) {
      return NextResponse.json({ error: 'Files not found' }, { status: 404 });
    }

    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
}
