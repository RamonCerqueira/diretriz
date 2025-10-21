'use client';

import { useEffect, useState } from 'react';
import { Album } from '@prisma/client';
import { Plus, Edit, Trash2, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

type AlbumWithCount = Album & {
  _count: {
    photos: number;
  };
};

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<AlbumWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch('/api/albums');
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error('Erro ao buscar álbuns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este álbum? Todas as fotos serão removidas.')) {
      return;
    }

    try {
      const response = await fetch(`/api/albums/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchAlbums();
      }
    } catch (error) {
      console.error('Erro ao deletar álbum:', error);
    }
  };

  const handleEdit = (album: Album) => {
    setEditingAlbum(album);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingAlbum(null);
    fetchAlbums();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Gerenciar Álbuns
                </h1>
                <p className="text-sm text-slate-600">
                  {albums.length} {albums.length === 1 ? 'álbum' : 'álbuns'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Novo Álbum
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-slate-600">Carregando...</div>
          </div>
        ) : albums.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600 mb-4">Nenhum álbum cadastrado</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Criar Primeiro Álbum
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <div
                key={album.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">
                        {album.title}
                      </h3>
                      {album.category && (
                        <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                          {album.category}
                        </span>
                      )}
                    </div>
                    <div className={`w-2 h-2 rounded-full ${album.isActive ? 'bg-green-500' : 'bg-slate-300'}`} />
                  </div>

                  {album.description && (
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {album.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    {album.location && <span>{album.location}</span>}
                    {album.year && <span>{album.year}</span>}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-sm text-slate-600">
                      {album._count.photos} {album._count.photos === 1 ? 'foto' : 'fotos'}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/albums/${album.id}/photos`}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Gerenciar fotos"
                      >
                        <ImageIcon className="w-4 h-4 text-slate-600" />
                      </Link>
                      <button
                        onClick={() => handleEdit(album)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4 text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(album.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Deletar"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Form Modal (simplificado) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-4">
              {editingAlbum ? 'Editar Álbum' : 'Novo Álbum'}
            </h2>
            <p className="text-slate-600 mb-4">
              Funcionalidade de formulário será implementada com React Hook Form e validação Zod.
            </p>
            <button
              onClick={handleFormClose}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

