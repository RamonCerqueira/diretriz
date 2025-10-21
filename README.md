# Landing Page - Diretriz Arquitetura e Engenharia

Uma landing page moderna e responsiva para a empresa Diretriz Arquitetura e Engenharia, com painel administrativo completo, galeria de projetos interativa e sistema de gerenciamento de conteúdo.

## 🎯 Características

- **Hero Section Interativa**: Efeito de "porta que se abre" ao rolar a página
- **Landing Page Completa**: Seções sobre, serviços, projetos, depoimentos e contato
- **Painel Administrativo**: Gerenciamento completo de conteúdo
- **Galeria de Projetos**: Sistema de álbuns com fotos
- **Lightbox Interativo**: Visualização de fotos em tela cheia
- **Formulário de Contato**: Integrado com banco de dados
- **Animações Modernas**: Transições suaves e efeitos visuais
- **Design Responsivo**: Funciona perfeitamente em todos os dispositivos
- **SEO Otimizado**: Meta tags e estrutura semântica

## 🛠️ Tecnologias Utilizadas

- **Next.js 15**: Framework React com SSR
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização utilitária
- **PostgreSQL**: Banco de dados relacional
- **Prisma**: ORM para banco de dados
- **Zod**: Validação de dados
- **Lucide Icons**: Ícones vetoriais

## 📋 Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL 12+ instalado e rodando
- npm ou yarn como gerenciador de pacotes

## 🚀 Instalação

### 1. Clonar o repositório

```bash
git clone <seu-repositorio>
cd diretriz-landing
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Banco de dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/diretriz"

# Próxima.js
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 4. Configurar banco de dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar tabelas no banco
npx prisma db push

# Popular com dados iniciais (opcional)
npm run db:seed
```

### 5. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
diretriz-landing/
├── app/
│   ├── api/                 # Rotas da API
│   │   ├── albums/
│   │   ├── photos/
│   │   ├── services/
│   │   ├── sections/
│   │   ├── contacts/
│   │   └── auth/
│   ├── admin/               # Painel administrativo
│   ├── projetos/            # Páginas de projetos
│   └── page.tsx             # Home page
├── components/
│   ├── sections/            # Componentes de seções
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   ├── PhotoGallery.tsx     # Galeria de fotos
│   └── Footer.tsx           # Rodapé
├── lib/
│   ├── prisma.ts            # Cliente Prisma
│   ├── validations.ts       # Schemas Zod
│   └── utils.ts             # Funções utilitárias
├── prisma/
│   ├── schema.prisma        # Schema do banco
│   └── seed.ts              # Script de seed
└── public/
    └── images/              # Imagens do projeto
```

## 🔑 Funcionalidades Principais

### Landing Page

- **Hero Section**: Animação interativa com efeito de porta
- **Sobre Nós**: Informações da empresa com estatísticas
- **Serviços**: Listagem de serviços com cards interativos
- **Projetos**: Galeria de projetos com filtros
- **Depoimentos**: Seção de avaliações de clientes
- **Contato**: Formulário de contato funcional
- **Footer**: Links rápidos e informações de contato

### Painel Administrativo

- **Login**: Autenticação segura
- **Gerenciamento de Álbuns**: Criar, editar e deletar projetos
- **Gerenciamento de Fotos**: Upload e organização de imagens
- **Gerenciamento de Serviços**: CRUD de serviços
- **Gerenciamento de Seções**: Editar conteúdo das seções
- **Contatos**: Visualizar mensagens recebidas

### Galeria de Projetos

- **Lightbox Interativo**: Visualização em tela cheia
- **Navegação**: Setas para próxima/anterior
- **Informações**: Título e descrição das fotos
- **Responsivo**: Adapta-se a qualquer tamanho de tela

## 🔐 Autenticação

Acesse o painel administrativo em `/admin/login` com as credenciais padrão:

- **Email**: admin@diretriz.com.br
- **Senha**: admin123

> ⚠️ **Importante**: Altere as credenciais padrão em produção!

## 📊 API Endpoints

### Álbuns
- `GET /api/albums` - Listar todos os álbuns
- `GET /api/albums/[id]` - Obter detalhes de um álbum
- `POST /api/albums` - Criar novo álbum
- `PUT /api/albums/[id]` - Atualizar álbum
- `DELETE /api/albums/[id]` - Deletar álbum

### Fotos
- `GET /api/photos` - Listar fotos
- `POST /api/photos` - Fazer upload de foto
- `DELETE /api/photos/[id]` - Deletar foto

### Serviços
- `GET /api/services` - Listar serviços
- `POST /api/services` - Criar serviço
- `PUT /api/services/[id]` - Atualizar serviço
- `DELETE /api/services/[id]` - Deletar serviço

### Seções
- `GET /api/sections` - Listar seções
- `PUT /api/sections/[id]` - Atualizar seção

### Contatos
- `POST /api/contacts` - Enviar mensagem de contato

## 🎨 Customização

### Cores

As cores principais estão definidas no Tailwind CSS. Para alterar:

1. Edite `tailwind.config.ts`
2. Altere a paleta de cores
3. Atualize os componentes conforme necessário

### Conteúdo

Todos os textos e imagens podem ser editados através do painel administrativo ou diretamente nos componentes.

## 📱 Responsividade

O projeto é totalmente responsivo e foi testado em:

- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## ⚡ Performance

- **Otimização de Imagens**: Compressão automática
- **Code Splitting**: Carregamento sob demanda
- **Lazy Loading**: Imagens carregadas conforme necessário
- **Caching**: Estratégia de cache eficiente

## 🐛 Troubleshooting

### Erro de conexão com banco de dados

```bash
# Verifique se PostgreSQL está rodando
sudo service postgresql status

# Verifique a URL de conexão em .env.local
```

### Erro ao fazer upload de imagens

```bash
# Verifique permissões da pasta public/images
chmod 755 public/images
```

### Porta 3000 já em uso

```bash
# Use uma porta diferente
npm run dev -- -p 3001
```

## 📦 Build para Produção

```bash
# Compilar aplicação
npm run build

# Iniciar servidor de produção
npm start
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Outras plataformas

A aplicação pode ser deployada em qualquer plataforma que suporte Node.js 18+:

- Heroku
- Railway
- Render
- AWS
- Google Cloud
- Azure

## 📝 Licença

Este projeto é propriedade da Diretriz Arquitetura e Engenharia.

## 📞 Suporte

Para suporte técnico, entre em contato através do formulário de contato no site ou envie um email para contato@diretriz.com.br

## 🤝 Contribuindo

Para contribuir com melhorias:

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

---

**Desenvolvido com ❤️ para Diretriz Arquitetura e Engenharia**
