import { z } from 'zod';

// Schema para autenticação
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

// Schema para informações da empresa
export const companyInfoSchema = z.object({
  cnpj: z.string().min(14, 'CNPJ inválido'),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  address: z.string().min(3, 'Endereço deve ter no mínimo 3 caracteres'),
  city: z.string().min(2, 'Cidade deve ter no mínimo 2 caracteres'),
  state: z.string().length(2, 'Estado deve ter 2 caracteres'),
  foundedYear: z.number().int().min(1900).max(new Date().getFullYear()),
  phone: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
  description: z.string().optional(),
  mission: z.string().optional(),
  vision: z.string().optional(),
  values: z.string().optional(),
});

// Schema para seções
export const sectionSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  subtitle: z.string().optional(),
  content: z.string().optional(),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  type: z.enum(['hero', 'about', 'services', 'contact', 'custom']),
});

// Schema para serviços
export const serviceSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  icon: z.string().optional(),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

// Schema para álbuns
export const albumSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  description: z.string().optional(),
  coverImage: z.string().url('URL inválida').optional().or(z.literal('')),
  client: z.string().optional(),
  location: z.string().optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 10).optional(),
  category: z.string().optional(),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

// Schema para fotos
export const photoSchema = z.object({
  albumId: z.string().cuid('ID do álbum inválido'),
  imageUrl: z.string().url('URL inválida'),
  title: z.string().optional(),
  description: z.string().optional(),
  order: z.number().int().min(0).default(0),
});

// Schema para depoimentos
export const testimonialSchema = z.object({
  clientName: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  company: z.string().optional(),
  content: z.string().min(10, 'Conteúdo deve ter no mínimo 10 caracteres'),
  rating: z.number().int().min(1).max(5).default(5),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

// Schema para membros da equipe
export const teamMemberSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  role: z.string().min(3, 'Cargo deve ter no mínimo 3 caracteres'),
  bio: z.string().optional(),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  linkedIn: z.string().url('URL inválida').optional().or(z.literal('')),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

// Schema para contatos
export const contactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
});

// Tipos inferidos dos schemas
export type LoginInput = z.infer<typeof loginSchema>;
export type CompanyInfoInput = z.infer<typeof companyInfoSchema>;
export type SectionInput = z.infer<typeof sectionSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type AlbumInput = z.infer<typeof albumSchema>;
export type PhotoInput = z.infer<typeof photoSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

