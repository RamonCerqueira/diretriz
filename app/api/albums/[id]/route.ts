import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { albumSchema } from '@/lib/validations';
import { z } from 'zod';

// GET - Buscar álbum por ID com todas as fotos
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const album = await prisma.album.findUnique({
      where: { id },
      include: {
        photos: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!album) {
      return NextResponse.json(
        { error: 'Álbum não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(album);
  } catch (error) {
    console.error('Erro ao buscar álbum:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar álbum' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar álbum
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = albumSchema.partial().parse(body);

    const album = await prisma.album.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(album);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Erro ao atualizar álbum:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar álbum' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar álbum (e suas fotos em cascata)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.album.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Álbum deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar álbum:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar álbum' },
      { status: 500 }
    );
  }
}

