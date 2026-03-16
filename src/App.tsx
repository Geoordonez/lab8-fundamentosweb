import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Toaster } from './components/ui/sonner'; // Ruta relativa
import { Home, Building2, Scale } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { NewPropertyPage } from './pages/NewPropertyPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import ComparePage from './pages/ComparePage';

function App(): React.ReactElement {
  // Estado para guardar los IDs de las propiedades a comparar
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(item => item !== id);
      if (prev.length < 3) return [...prev, id];
      return prev;
    });
  };

  return (
    <>
      <Toaster position="top-right" richColors closeButton />

      <div className="min-h-screen flex flex-col bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center px-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Building2 className="h-6 w-6 text-primary" />
              <span>RealEstate</span>
            </Link>

            <nav className="ml-auto flex items-center gap-4">
              {/* Icono de balanza para ir a comparar */}
              <Link
                to="/compare"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative"
              >
                <Scale className="h-4 w-4" />
                Comparar
                {compareIds.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 rounded-full">
                    {compareIds.length}
                  </span>
                )}
              </Link>

              <Link
                to="/"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                Inicio
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={<HomePage compareIds={compareIds} onToggleCompare={toggleCompare} />} 
            />
            <Route path="/new" element={<NewPropertyPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route 
              path="/compare" 
              element={<ComparePage selectedIds={compareIds} />} 
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;