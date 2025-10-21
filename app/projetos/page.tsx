'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  location: string;
  year: number;
  category: string;
  _count: {
    photos: number;
  };
}

export default function ProjetosPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('/api/albums');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Erro ao buscar álbuns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const categories = ['all', ...new Set(albums.map(a => a.category))];
  const filteredAlbums = selectedCategory === 'all' 
    ? albums 
    : albums.filter(a => a.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:text-yellow-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <h1 className="text-5xl font-bold mb-4">Todos os Projetos</h1>
          <p className="text-xl text-slate-300">Conheça toda a nossa galeria de projetos</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-slate-900 shadow-lg'
                  : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
              }`}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </div>

        {/* Grid de projetos */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album, index) => (
              <Link
                key={album.id}
                href={`/projetos/${album.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-96 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                  <div>
                    <span className="inline-block px-3 py-1 bg-yellow-500 text-slate-900 text-xs font-bold rounded-full">
                      {album.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                      {album.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-slate-200 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{album.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-200 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{album.year}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm line-clamp-2">
                      {album.description}
                    </p>
                  </div>

                  <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                    {album._count.photos} fotos
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredAlbums.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">Nenhum projeto encontrado nesta categoria.</p>
          </div>
        )}
      </div>

      <style jsx>{`
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
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
