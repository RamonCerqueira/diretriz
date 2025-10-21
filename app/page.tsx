import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/sections/HeroSection';
import DuploHeroSection from '@/components/sections/DuploHeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
export interface Section {
  id: string;
  type: string;
  title: string | null;
  subtitle?: string | null;
  content?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  order: number;
}

export interface Service {
  id: string;
  title: string | null;
  description?: string | null;
  icon?: string | null;
  isActive: boolean;
  order: number;
}

export interface Photo {
  id: string;
  title?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  order: number;
}

export interface Album {
  id: string;
  title: string | null;
  description?: string | null;
  coverImage?: string | null;
  client?: string | null;
  location?: string | null;
  category?: string | null;
  order: number;
  isActive: boolean;
  photos: Photo[];
  _count: { photos: number };
}

export interface Testimonial {
  id: string;
  clientName?: string | null;
  company?: string | null;
  content?: string | null;
  imageUrl?: string | null;
  rating?: number;
  isActive: boolean;
  order: number;
}

export interface CompanyInfo {
  name?: string | null;
  description?: string | null;
  mission?: string | null;
  vision?: string | null;
  values?: string | null;
  foundedYear?: number;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
}

// Helper genérico para normalizar string | null em string
function normalizeString(value: string | null | undefined) {
  return value ?? '';
}

// Normalizar sections
function normalizeSection(section: any) {
  return {
    ...section,
    title: normalizeString(section.title),
    subtitle: normalizeString(section.subtitle),
    content: normalizeString(section.content),
    imageUrl: normalizeString(section.imageUrl),
  };
}

// Normalizar company info para AboutSection e ContactSection
function normalizeCompanyInfo(info: any) {
  if (!info) return null;
  return {
    name: normalizeString(info.name),
    description: normalizeString(info.description),
    mission: normalizeString(info.mission),
    vision: normalizeString(info.vision),
    values: normalizeString(info.values),
    foundedYear: info.foundedYear ?? 0,
    phone: normalizeString(info.phone),
    email: normalizeString(info.email),
    address: normalizeString(info.address),
    city: normalizeString(info.city),
    state: normalizeString(info.state),
  };
}

// Normalizar Service
function normalizeService(service: any) {
  return {
    ...service,
    title: normalizeString(service.title),
    description: normalizeString(service.description),
    icon: normalizeString(service.icon),
  };
}

// Normalizar Album
function normalizeAlbum(album: any) {
  return {
    ...album,
    title: normalizeString(album.title),
    description: normalizeString(album.description),
    coverImage: normalizeString(album.coverImage),
    client: normalizeString(album.client),
    location: normalizeString(album.location),
    category: normalizeString(album.category),
    photos: album.photos.map((p: any) => ({
      ...p,
      title: normalizeString(p.title),
      description: normalizeString(p.description),
      imageUrl: normalizeString(p.imageUrl),
    })),
  };
}

// Normalizar Testimonial
function normalizeTestimonial(testimonial: any) {
  return {
    ...testimonial,
    clientName: normalizeString(testimonial.clientName),
    company: normalizeString(testimonial.company),
    content: normalizeString(testimonial.content),
    imageUrl: normalizeString(testimonial.imageUrl),
    rating: testimonial.rating ?? 5,
  };
}

export default async function Home() {
  // Buscar dados do banco de dados
  const [sectionsRaw, servicesRaw, albumsRaw, testimonialsRaw, companyInfoRaw] =
    await Promise.all([
      prisma.section.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      }),
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      }),
      prisma.album.findMany({
        where: { isActive: true },
        include: {
          photos: {
            orderBy: { order: 'asc' },
          },
          _count: { select: { photos: true } },
        },
        orderBy: { order: 'asc' },
        take: 6,
      }),
      prisma.testimonial.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        take: 3,
      }),
      prisma.companyInfo.findFirst(),
    ]);

  const companyInfo = normalizeCompanyInfo(companyInfoRaw);

  const aboutDataRaw = sectionsRaw.find((s) => s.type === 'about');
  const aboutData = aboutDataRaw ? normalizeSection(aboutDataRaw) : null;

  const servicesDataRaw = sectionsRaw.find((s) => s.type === 'services');
  const servicesData = servicesDataRaw ? normalizeSection(servicesDataRaw) : null;

  const services = servicesRaw.map(normalizeService);
  const albums = albumsRaw.map(normalizeAlbum);
  const testimonials = testimonialsRaw.map(normalizeTestimonial);

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <DuploHeroSection />

      {aboutData && <AboutSection data={aboutData} companyInfo={companyInfo} />}
      {servicesData && services.length > 0 && (
        <ServicesSection data={servicesData} services={services} />
      )}
      {albums.length > 0 && <ProjectsSection albums={albums} />}
      {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}
      <ContactSection companyInfo={companyInfo} />
      <Footer companyInfo={companyInfo} />
    </main>
  );
}
