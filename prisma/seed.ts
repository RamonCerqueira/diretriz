import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@diretriz.com.br' },
    update: {},
    create: {
      email: 'admin@diretriz.com.br',
      password: hashedPassword,
      name: 'Administrador',
    },
  });
  console.log('✅ Usuário admin criado:', admin.email);

  // Criar informações da empresa
  const companyInfo = await prisma.companyInfo.upsert({
    where: { cnpj: '27.175.426/0001-32' },
    update: {},
    create: {
      cnpj: '27.175.426/0001-32',
      name: 'DIRETRIZ ARQUITETURA E ENGENHARIA LTDA - ME',
      address: 'Valença',
      city: 'Valença',
      state: 'BA',
      foundedYear: 2017,
      phone: '(73) 99999-9999',
      email: 'contato@diretriz.com.br',
      description: 'A Diretriz é uma empresa especializada em serviços de arquitetura e engenharia, oferecendo soluções completas e personalizadas para projetos residenciais, comerciais e industriais.',
      mission: 'Transformar ideias em projetos excepcionais, combinando criatividade, técnica e sustentabilidade.',
      vision: 'Ser referência em arquitetura e engenharia na região, reconhecida pela excelência e inovação.',
      values: 'Qualidade, Inovação, Sustentabilidade, Compromisso com o Cliente',
    },
  });
  console.log('✅ Informações da empresa criadas');

  // Criar seções da landing page
  const heroSection = await prisma.section.create({
    data: {
      title: 'Diretriz | Arquitetura e Engenharia',
      subtitle: 'Transformando ideias em projetos excepcionais',
      content: 'Soluções completas em arquitetura e engenharia para seu projeto dos sonhos',
      type: 'hero',
      order: 1,
      isActive: true,
    },
  });

  const aboutSection = await prisma.section.create({
    data: {
      title: 'Sobre Nós',
      subtitle: 'Excelência em cada projeto',
      content: 'Com mais de 7 anos de experiência, a Diretriz se destaca pela qualidade técnica e criatividade em cada projeto. Nossa equipe multidisciplinar trabalha de forma integrada para entregar soluções que superam expectativas.',
      type: 'about',
      order: 2,
      isActive: true,
    },
  });

  const servicesSection = await prisma.section.create({
    data: {
      title: 'Nossos Serviços',
      subtitle: 'Soluções completas para seu projeto',
      content: 'Oferecemos uma gama completa de serviços em arquitetura e engenharia',
      type: 'services',
      order: 3,
      isActive: true,
    },
  });

  console.log('✅ Seções da landing page criadas');

  // Criar serviços
  const services = await prisma.service.createMany({
    data: [
      {
        title: 'Projetos Arquitetônicos',
        description: 'Desenvolvimento de projetos arquitetônicos residenciais, comerciais e industriais, com foco em funcionalidade, estética e sustentabilidade.',
        icon: 'building',
        order: 1,
      },
      {
        title: 'Projetos Estruturais',
        description: 'Cálculo e dimensionamento de estruturas em concreto, aço e madeira, garantindo segurança e economia.',
        icon: 'hammer',
        order: 2,
      },
      {
        title: 'Projetos Hidrossanitários',
        description: 'Projetos de instalações hidráulicas e sanitárias, com soluções eficientes e sustentáveis.',
        icon: 'droplet',
        order: 3,
      },
      {
        title: 'Projetos Elétricos',
        description: 'Dimensionamento de instalações elétricas prediais, incluindo iluminação, tomadas e sistemas de proteção.',
        icon: 'zap',
        order: 4,
      },
      {
        title: 'Regularização de Obras',
        description: 'Assessoria completa para regularização de obras junto aos órgãos competentes.',
        icon: 'file-check',
        order: 5,
      },
      {
        title: 'Consultoria Técnica',
        description: 'Consultoria especializada em arquitetura e engenharia para otimização de projetos e processos.',
        icon: 'users',
        order: 6,
      },
    ],
  });
  console.log('✅ Serviços criados');

  // Criar álbuns de exemplo
  const album1 = await prisma.album.create({
    data: {
      title: 'Residência Moderna - Casa Lago Azul',
      description: 'Projeto residencial contemporâneo com 280m², integrando ambientes internos e externos com vista para o lago.',
      client: 'Família Silva',
      location: 'Valença, BA',
      year: 2023,
      category: 'Residencial',
      order: 1,
      isActive: true,
    },
  });

  const album2 = await prisma.album.create({
    data: {
      title: 'Edifício Comercial - Centro Empresarial',
      description: 'Projeto comercial de 5 pavimentos com salas comerciais e estacionamento.',
      client: 'Construtora XYZ',
      location: 'Valença, BA',
      year: 2022,
      category: 'Comercial',
      order: 2,
      isActive: true,
    },
  });

  const album3 = await prisma.album.create({
    data: {
      title: 'Reforma e Ampliação - Sobrado Colonial',
      description: 'Reforma completa de sobrado histórico preservando características originais.',
      client: 'Sr. João Santos',
      location: 'Valença, BA',
      year: 2024,
      category: 'Reforma',
      order: 3,
      isActive: true,
    },
  });

  console.log('✅ Álbuns de projetos criados');

  // Criar depoimentos
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'Maria Silva',
        company: 'Família Silva',
        content: 'A Diretriz superou todas as nossas expectativas! O projeto da nossa casa ficou incrível, exatamente como sonhávamos. A equipe é extremamente profissional e atenciosa.',
        rating: 5,
        order: 1,
      },
      {
        clientName: 'Carlos Oliveira',
        company: 'Construtora XYZ',
        content: 'Parceria de excelência! Os projetos são sempre entregues no prazo e com altíssima qualidade técnica. Recomendo fortemente.',
        rating: 5,
        order: 2,
      },
      {
        clientName: 'Ana Paula Costa',
        company: 'Loja Bella Vista',
        content: 'Profissionais competentes e criativos. Transformaram nosso espaço comercial em um ambiente moderno e funcional.',
        rating: 5,
        order: 3,
      },
    ],
  });
  console.log('✅ Depoimentos criados');

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

