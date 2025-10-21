'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : prev === 0 ? photos.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : prev === photos.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {/* Grid de fotos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-64 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => openLightbox(index)}
          >
            <img
              src={photo.imageUrl}
              alt={photo.title || `Foto ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div>
                <h3 className="text-white font-semibold mb-1">{photo.title || `Foto ${index + 1}`}</h3>
                {photo.description && (
                  <p className="text-slate-200 text-sm">{photo.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-fade-in">
          {/* Imagem */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={photos[selectedIndex].imageUrl}
              alt={photos[selectedIndex].title || `Foto ${selectedIndex + 1}`}
              className="max-w-full max-h-full object-contain animate-zoom-in"
            />

            {/* Informações */}
            {(photos[selectedIndex].title || photos[selectedIndex].description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                {photos[selectedIndex].title && (
                  <h3 className="text-2xl font-bold mb-2">{photos[selectedIndex].title}</h3>
                )}
                {photos[selectedIndex].description && (
                  <p className="text-slate-200">{photos[selectedIndex].description}</p>
                )}
              </div>
            )}

            {/* Controles */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
                  {selectedIndex + 1} / {photos.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-zoom-in {
          animation: zoom-in 0.3s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
