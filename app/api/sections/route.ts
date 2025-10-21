import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sectionSchema } from '@/lib/validations';
import { z } from 'zod';

// GET - Listar todas as seções
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');

    const sections = await prisma.section.findMany({
      where: isActive !== null ? { isActive: isActive === 'true' } : undefined,
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Erro ao buscar seções:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar seções' },
      { status: 500 }
    );
  }
}

// POST - Criar nova seção
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = sectionSchema.parse(body);

    const section = await prisma.section.create({
      data: validatedData,
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Erro ao criar seção:', error);
    return NextResponse.json(
      { error: 'Erro ao criar seção' },
      { status: 500 }
    );
  }
}

