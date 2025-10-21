import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sectionSchema } from '@/lib/validations';
import { z } from 'zod';

// GET - Buscar seção por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const section = await prisma.section.findUnique({
      where: { id },
    });

    if (!section) {
      return NextResponse.json(
        { error: 'Seção não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error('Erro ao buscar seção:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar seção' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar seção
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = sectionSchema.partial().parse(body);

    const section = await prisma.section.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(section);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Erro ao atualizar seção:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar seção' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar seção
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.section.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Seção deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar seção:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar seção' },
      { status: 500 }
    );
  }
}

