import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { serviceSchema } from '@/lib/validations';
import { z } from 'zod';

// PUT - Atualizar serviço
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = serviceSchema.partial().parse(body);

    const service = await prisma.service.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(service);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Erro ao atualizar serviço:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar serviço' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar serviço
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Serviço deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar serviço:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar serviço' },
      { status: 500 }
    );
  }
}

