import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { photoSchema } from '@/lib/validations';
import { z } from 'zod';

// GET - Listar fotos (opcionalmente filtradas por álbum)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const albumId = searchParams.get('albumId');

    const photos = await prisma.photo.findMany({
      where: albumId ? { albumId } : undefined,
      include: {
        album: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(photos);
  } catch (error) {
    console.error('Erro ao buscar fotos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar fotos' },
      { status: 500 }
    );
  }
}

// POST - Criar nova foto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = photoSchema.parse(body);

    const photo = await prisma.photo.create({
      data: validatedData,
      include: {
        album: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Erro ao criar foto:', error);
    return NextResponse.json(
      { error: 'Erro ao criar foto' },
      { status: 500 }
    );
  }
}

