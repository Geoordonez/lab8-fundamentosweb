
import { PROPERTY_TYPE_LABELS } from "../types/property";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { getAllProperties } from "../lib/storage"; 

interface Props {
  selectedIds: string[];
}

export default function ComparePage({ selectedIds }: Props) {
    const allProperties = getAllProperties();
 
  const properties = allProperties.filter(p => selectedIds.includes(p.id));

  if (properties.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">No hay propiedades seleccionadas</h2>
        <p className="text-muted-foreground">Regresa al inicio y selecciona hasta 3 propiedades.</p>
      </div>
    );
  }

  const minPrice = Math.min(...properties.map(p => p.price));
  const maxArea = Math.max(...properties.map(p => p.area));

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Comparativa</h1>
      <div className="rounded-md border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Atributo</TableHead>
              {properties.map(p => (
                <TableHead key={p.id} className="min-w-[200px]">
                  <img src={p.images[0]} className="rounded h-24 w-full object-cover mb-2" />
                  <span className="font-bold">{p.title}</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Precio</TableCell>
              {properties.map(p => (
                <TableCell key={p.id} className={p.price === minPrice ? "text-green-600 font-bold" : ""}>
                  ${p.price.toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Área</TableCell>
              {properties.map(p => (
                <TableCell key={p.id} className={p.area === maxArea ? "text-green-600 font-bold" : ""}>
                  {p.area} m²
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}