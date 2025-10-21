export interface AlbumWithCount {
    id: string;
    title: string;
    description?: string;
    coverImage?: string;
    client?: string;
    location?: string;
    year?: number;
    category?: string;
    order: number;
    isActive: boolean;
    createdAt: string; // ou Date se você transformar na API
    updatedAt: string;
    _count: {
      photos: number;
    };
  }
  