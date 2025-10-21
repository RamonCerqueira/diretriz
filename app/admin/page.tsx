import { prisma } from '@/lib/prisma';
import { 
  Building2, 
  FileText, 
  Image as ImageIcon, 
  MessageSquare, 
  Briefcase,
  Users 
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  // Buscar estatísticas
  const [
    sectionsCount,
    servicesCount,
    albumsCount,
    photosCount,
    contactsCount,
    unreadContactsCount,
  ] = await Promise.all([
    prisma.section.count(),
    prisma.service.count(),
    prisma.album.count(),
    prisma.photo.count(),
    prisma.contact.count(),
    prisma.contact.count({ where: { isRead: false } }),
  ]);

  const stats = [
    {
      title: 'Seções',
      value: sectionsCount,
      icon: FileText,
      href: '/admin/sections',
      color: 'bg-blue-500',
    },
    {
      title: 'Serviços',
      value: servicesCount,
      icon: Briefcase,
      href: '/admin/services',
      color: 'bg-green-500',
    },
    {
      title: 'Álbuns',
      value: albumsCount,
      icon: ImageIcon,
      href: '/admin/albums',
      color: 'bg-purple-500',
    },
    {
      title: 'Fotos',
      value: photosCount,
      icon: ImageIcon,
      href: '/admin/photos',
      color: 'bg-pink-500',
    },
    {
      title: 'Contatos',
      value: contactsCount,
      icon: MessageSquare,
      href: '/admin/contacts',
      color: 'bg-orange-500',
      badge: unreadContactsCount > 0 ? unreadContactsCount : undefined,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-slate-900" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Painel Administrativo
                </h1>
                <p className="text-sm text-slate-600">
                  Diretriz | Arquitetura e Engenharia
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              Ver Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.title}
                href={stat.href}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 ${stat.color} rounded-xl relative`}>
                    <Icon className="w-6 h-6 text-white" />
                    {stat.badge && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {stat.badge}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Ações Rápidas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/sections"
              className="p-4 border-2 border-slate-200 rounded-xl hover:border-slate-900 transition-colors text-center"
            >
              <FileText className="w-8 h-8 mx-auto mb-2 text-slate-700" />
              <div className="font-semibold text-slate-900">Gerenciar Seções</div>
            </Link>
            <Link
              href="/admin/services"
              className="p-4 border-2 border-slate-200 rounded-xl hover:border-slate-900 transition-colors text-center"
            >
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-slate-700" />
              <div className="font-semibold text-slate-900">Gerenciar Serviços</div>
            </Link>
            <Link
              href="/admin/albums"
              className="p-4 border-2 border-slate-200 rounded-xl hover:border-slate-900 transition-colors text-center"
            >
              <ImageIcon className="w-8 h-8 mx-auto mb-2 text-slate-700" />
              <div className="font-semibold text-slate-900">Gerenciar Álbuns</div>
            </Link>
            <Link
              href="/admin/contacts"
              className="p-4 border-2 border-slate-200 rounded-xl hover:border-slate-900 transition-colors text-center relative"
            >
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-700" />
              <div className="font-semibold text-slate-900">Ver Contatos</div>
              {unreadContactsCount > 0 && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {unreadContactsCount}
                </div>
              )}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

