import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { photoSchema } from '@/lib/validations';
import { z } from 'zod';

// GET - Buscar foto por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const photo = await prisma.photo.findUnique({
      where: { id },
      include: {
        album: true,
      },
    });

    if (!photo) {
      return NextResponse.json(
        { error: 'Foto não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(photo);
  } catch (error) {
    console.error('Erro ao buscar foto:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar foto' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar foto
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = photoSchema.partial().parse(body);

    const photo = await prisma.photo.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(photo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Erro ao atualizar foto:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar foto' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar foto
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.photo.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Foto deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar foto:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar foto' },
      { status: 500 }
    );
  }
}

