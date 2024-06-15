// src/app/api/notes/[id]/route.ts

import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.notes.delete({
      where: { note_id: parseInt(id, 10) }
    });
    return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}
