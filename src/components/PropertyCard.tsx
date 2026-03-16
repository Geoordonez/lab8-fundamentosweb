import type React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Square, Trash2 } from 'lucide-react';
// IMPORTANTE: Al estar en la carpeta 'components', entramos a './ui/' para los átomos
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CompareButton } from './ui/compare-button';
// Nota los dos puntos para subir un nivel y entrar a types
import type { Property } from '../types/property'; 
import { PROPERTY_TYPE_LABELS, OPERATION_TYPE_LABELS } from '../types/property';

interface PropertyCardProps {
  property: Property;
  onDelete?: (id: string) => void;
  isComparing: boolean;
  onCompareToggle: () => void;
  compareCount: number;
}

export function PropertyCard({ 
  property, 
  onDelete, 
  isComparing, 
  onCompareToggle,
  compareCount 
}: PropertyCardProps): React.ReactElement {
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      
      {/* Todo esto ahora es clickeable y te lleva a los detalles */}
      <Link to={`/property/${property.id}`} className="block flex-grow transition-opacity hover:opacity-90 cursor-pointer">
        <div className="relative aspect-video">
          <img
            src={property.images[0]}
            alt={property.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Badge variant="secondary">
              {PROPERTY_TYPE_LABELS[property.propertyType]}
            </Badge>
            <Badge variant={property.operationType === 'venta' ? 'default' : 'outline'}>
              {OPERATION_TYPE_LABELS[property.operationType]}
            </Badge>
          </div>
        </div>

        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-lg leading-none truncate">{property.title}</h3>
            <p className="font-bold text-primary">${property.price.toLocaleString()}</p>
          </div>
          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <MapPin className="h-3 w-3 mr-1 shrink-0" />
            <span className="truncate">{property.address}, {property.city}</span>
          </div>
        </CardHeader>

        <CardContent className="p-4 flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BedDouble className="h-4 w-4" />
            {property.bedrooms} hab.
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            {property.area} m²
          </div>
        </CardContent>
      </Link>

      {/* Los botones se quedan abajo, fuera del Link */}
      <CardFooter className="p-4 pt-0 mt-auto flex flex-col gap-2">
        <CompareButton 
          isComparing={isComparing}
          onToggle={onCompareToggle}
          disabled={compareCount >= 3 && !isComparing}
        />
        
        {onDelete && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={(e) => {
              // Prevenimos que haga clic en el Link por error al dar en eliminar
              e.preventDefault(); 
              e.stopPropagation();
              onDelete(property.id);
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}