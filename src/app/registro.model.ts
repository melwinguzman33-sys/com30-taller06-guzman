export type Prioridad = 'Baja' | 'Media' | 'Alta' | 'Crítica';
export type Estado = 'Pendiente' | 'En proceso' | 'Resuelta';

export interface Item {
  codigo: string;
  ubicacion: string;
}

export interface Registro {
  id: number;
  solicitante: string;
  correo: string;
  categoria: string;
  prioridad: Prioridad;
  descripcion: string;
  impacto: string;
  items: Item[];
  estado: Estado;
}