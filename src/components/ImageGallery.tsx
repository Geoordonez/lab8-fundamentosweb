
import { useState } from 'react';
import { ImageModal } from './ImageModal';


interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Funciones para navegar
  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Imagen Principal (Grande) */}
      <div 
        className="relative aspect-video cursor-pointer overflow-hidden rounded-xl border bg-muted"
        onClick={() => openModal(0)}
      >
        <img 
          src={images[0]} 
          alt="Principal" 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      {/* Cuadrícula de Miniaturas (Thumbnails) */}
      <div className="grid grid-cols-4 gap-4">
        {images.slice(1, 5).map((img, idx) => (
          <div 
            key={idx} 
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg border bg-muted"
            onClick={() => openModal(idx + 1)}
          >
            <img 
              src={img} 
              alt={`Miniatura ${idx}`} 
              className="h-full w-full object-cover hover:opacity-80"
            />
            {/* Si hay más de 5 fotos, mostrar "+X" en la última miniatura */}
            {idx === 3 && images.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold">
                +{images.length - 5}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* El Modal que creaste antes */}
      {isOpen && (
        <ImageModal 
          images={images} 
          currentIndex={selectedIndex} 
          onClose={() => setIsOpen(false)}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
}