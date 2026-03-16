import { Button } from "./button"; // <--- Agregamos /ui/// Importa el componente que ya tienes ahí
import { Check, Plus } from "lucide-react";

interface Props {
  isComparing: boolean;
  onToggle: () => void;
  disabled: boolean;
}

export function CompareButton({ isComparing, onToggle, disabled }: Props) {
  return (
    <Button
      variant={isComparing ? "default" : "outline"}
      className="w-full"
      disabled={disabled && !isComparing}
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      }}
    >
      {isComparing ? <Check className="mr-2 h-4" /> : <Plus className="mr-2 h-4" />}
      {isComparing ? "Seleccionado" : "Comparar"}
    </Button>
  );
}