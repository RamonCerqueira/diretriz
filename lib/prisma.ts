// ===========================================================
// 📦 PRISMA CLIENT - FINAL PARA NEXT.JS + VERCEL
// ===========================================================

import { PrismaClient } from '@prisma/client';

// Evita múltiplas instâncias no Next.js (Hot Reload / Dev)
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Logs diferentes para produção e desenvolvimento
    log:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn'] // Apenas erros e avisos em produção
        : [
            { emit: 'event', level: 'query' },
            { emit: 'stdout', level: 'error' },
            { emit: 'stdout', level: 'warn' },
          ],
  });

// 🎯 Log detalhado de queries apenas no modo DEBUG
if (process.env.DEBUG_PRISMA === 'true' && process.env.NODE_ENV !== 'production') {
  prisma.$on('query', (e: any) => {
    console.log('\x1b[36m%s\x1b[0m', '🔍 PRISMA QUERY');
    console.log('SQL:', e.query);
    console.log('Params:', e.params);
    console.log('Duration:', e.duration, 'ms\n');
  });
}

// Salva no global para evitar múltiplas instâncias no dev
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}

// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query', 'error', 'warn'],
//   });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

