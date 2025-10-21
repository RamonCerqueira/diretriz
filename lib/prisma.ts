import { PrismaClient, Prisma } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn'] // ✅ strings literais suficientes
        : [
            { emit: 'event', level: 'query' },
            { emit: 'stdout', level: 'error' },
            { emit: 'stdout', level: 'warn' },
          ], // ✅ já tipado como Prisma.LogDefinition[]
  });

// 🎯 Log detalhado apenas no modo desenvolvimento
if (process.env.DEBUG_PRISMA === 'true') {
  (prisma as any).$on('query', (e: Prisma.QueryEvent) => {
    console.log('\x1b[36m%s\x1b[0m', '🔍 PRISMA QUERY');
    console.log('SQL:', e.query);
    console.log('Params:', e.params);
    console.log('Duration:', e.duration, 'ms\n');
  });
}

// Evitar múltiplas instâncias no Next.js
globalForPrisma.prisma = prisma;

// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query', 'error', 'warn'],
//   });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

