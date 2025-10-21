'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

interface Photo {
  id: string;
  imageUrl: string;
}

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  location: string;
  year: number;
  category: string;
  photos: Photo[];
  _count: {
    photos: number;
  };
}

interface ProjectsSectionProps {
  albums: Album[];
}

export default function ProjectsSection({ albums }: ProjectsSectionProps) {
  return (
    <section id="projetos" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
              <Calendar className="w-4 h-4" />
              Portfólio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Nossos Projetos
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Conheça os projetos que transformaram espaços em experiências memoráveis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album, index) => (
            <Link
              key={album.id}
              href={`/projetos/${album.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-96 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0">
                <img
                  src={album.coverImage || album.photos[0]?.imageUrl || '/images/default.jpg'}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                <div>
                  <span className="inline-block px-3 py-1 bg-yellow-500 text-slate-900 text-xs font-bold rounded-full transform group-hover:scale-110 transition-transform duration-300">
                    {album.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                    {album.title}
                  </h3>

                  <div className="space-y-2 mb-4 opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-slate-200 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{album.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-200 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{album.year}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm line-clamp-2 mb-4">
                    {album.description}
                  </p>

                  <div className="flex items-center gap-2 text-yellow-400 font-semibold group-hover:gap-3 transition-all duration-300">
                    Ver projeto
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                  {album._count.photos} fotos
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
          <p className="text-slate-600 mb-6">
            Quer ver mais projetos?
          </p>
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Ver Todos os Projetos
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
