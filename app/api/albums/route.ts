import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { albumSchema } from '@/lib/validations';
import { z } from 'zod';

// GET - Listar todos os álbuns
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    const category = searchParams.get('category');

    const albums = await prisma.album.findMany({
      where: {
        ...(isActive !== null && { isActive: isActive === 'true' }),
        ...(category && { category }),
      },
      include: {
        photos: {
          orderBy: { order: 'asc' },
          take: 1, // Apenas a primeira foto para preview
        },
        _count: {
          select: { photos: true },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(albums);
  } catch (error) {
    console.error('Erro ao buscar álbuns:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar álbuns' },
      { status: 500 }
    );
  }
}

// POST - Criar novo álbum
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = albumSchema.parse(body);

    const album = await prisma.album.create({
      data: validatedData,
    });

    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Erro ao criar álbum:', error);
    return NextResponse.json(
      { error: 'Erro ao criar álbum' },
      { status: 500 }
    );
  }
}

