import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ImageModal({ images, currentIndex, onClose, onNext, onPrev }: ImageModalProps) {
  // Manejo de teclado (Requisito de la Parte 2)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
      {/* Botón Cerrar */}
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
      >
        <X className="h-10 w-10" />
      </button>

      {/* Navegación Izquierda */}
      <button 
        onClick={onPrev} 
        className="absolute left-4 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      
      <div className="relative max-w-5xl w-full flex flex-col items-center">
        <img 
          src={images[currentIndex]} 
          className="max-h-[85vh] w-auto object-contain rounded-sm shadow-2xl" 
          alt={`Imagen ${currentIndex + 1}`} 
        />
        
        {/* Contador: "3 de 10" (Requisito de la Parte 2) */}
        <div className="text-white mt-6 bg-white/10 px-4 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Navegación Derecha */}
      <button 
        onClick={onNext} 
        className="absolute right-4 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Click fuera de la imagen para cerrar (Requisito de la Parte 2) */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}