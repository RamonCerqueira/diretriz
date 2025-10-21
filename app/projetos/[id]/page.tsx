'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Share2 } from 'lucide-react';
import PhotoGallery from '@/components/PhotoGallery';

interface Photo {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
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
}

export default function ProjetoDetalhePage() {
  const params = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`/api/albums/${params.id}`);
        const data = await response.json();
        setAlbum(data);
      } catch (error) {
        console.error('Erro ao buscar álbum:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAlbum();
    }
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </main>
    );
  }

  if (!album) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Projeto não encontrado</h1>
          <Link href="/projetos" className="text-yellow-600 hover:text-yellow-700 font-semibold">
            Voltar para projetos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projetos" className="inline-flex items-center gap-2 mb-6 hover:text-yellow-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Voltar aos Projetos
          </Link>
          <h1 className="text-5xl font-bold mb-4">{album.title}</h1>
          <div className="flex flex-wrap gap-6 text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{album.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{album.year}</span>
            </div>
            <span className="px-3 py-1 bg-yellow-500 text-slate-900 rounded-full text-sm font-semibold">
              {album.category}
            </span>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Descrição */}
        <div className="mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Sobre o Projeto</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            {album.description}
          </p>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 rounded-2xl p-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">{album.photos.length}</div>
              <p className="text-slate-600">Fotos do Projeto</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">{album.year}</div>
              <p className="text-slate-600">Ano de Conclusão</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">{album.category}</div>
              <p className="text-slate-600">Categoria</p>
            </div>
          </div>
        </div>

        {/* Galeria de Fotos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Galeria de Fotos</h2>
          {album.photos.length > 0 ? (
            <PhotoGallery photos={album.photos} />
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">Nenhuma foto disponível para este projeto.</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Gostou deste Projeto?</h3>
          <p className="text-lg mb-8 opacity-90">
            Entre em contato conosco para discutir seu próximo projeto
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contato"
              className="px-8 py-4 bg-white text-yellow-600 font-semibold rounded-lg hover:bg-slate-100 transition-all transform hover:scale-105 active:scale-95"
            >
              Solicitar Orçamento
            </Link>
            <button
              onClick={() => navigator.share?.({ title: album.title, text: album.description, url: window.location.href })}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Share2 className="w-5 h-5" />
              Compartilhar
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
