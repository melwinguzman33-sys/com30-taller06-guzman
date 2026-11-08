import { Registro } from './registro.model';

// Semilla del Taller 07: 12 solicitudes de la mesa de ayuda de TI.
// - Estados: Pendiente, En proceso y Resuelta (3).
// - Palabras compartidas: «piso» (R01, R06, R08, R12) e «impresora» (R01, R04, R10).
// - Palabra que no existe: «zzz».
export const SEMILLA: Registro[] = [
  {
    id: 1, solicitante: 'Ana Pérez', correo: 'ana.perez@unibarranquilla.edu.co',
    categoria: 'Hardware', prioridad: 'Alta', descripcion: 'Impresora del piso 2 no imprime',
    impacto: '', items: [{ codigo: 'IMP-201', ubicacion: 'Piso 2' }], estado: 'Pendiente',
  },
  {
    id: 2, solicitante: 'Carlos Díaz', correo: 'carlos.diaz@unibarranquilla.edu.co',
    categoria: 'Red', prioridad: 'Crítica', descripcion: 'Sin conexión a internet en la sala de sistemas',
    impacto: 'Clases suspendidas', items: [{ codigo: 'SW-010', ubicacion: 'Sala de sistemas' }], estado: 'En proceso',
  },
  {
    id: 3, solicitante: 'Luisa Gómez', correo: 'luisa.gomez@unibarranquilla.edu.co',
    categoria: 'Software', prioridad: 'Media', descripcion: 'Instalar Office en portátil nuevo',
    impacto: '', items: [{ codigo: 'PT-115', ubicacion: 'Decanatura' }], estado: 'Resuelta',
  },
  {
    id: 4, solicitante: 'Jorge Martínez', correo: 'jorge.martinez@unibarranquilla.edu.co',
    categoria: 'Hardware', prioridad: 'Baja', descripcion: 'Impresora atasca el papel en biblioteca',
    impacto: '', items: [{ codigo: 'IMP-102', ubicacion: 'Biblioteca' }], estado: 'Resuelta',
  },
  {
    id: 5, solicitante: 'María Rodríguez', correo: 'maria.rodriguez@unibarranquilla.edu.co',
    categoria: 'Accesos', prioridad: 'Alta', descripcion: 'Restablecer contraseña del correo institucional',
    impacto: '', items: [{ codigo: 'PC-301', ubicacion: 'Registro académico' }], estado: 'Pendiente',
  },
  {
    id: 6, solicitante: 'Pedro Castillo', correo: 'pedro.castillo@unibarranquilla.edu.co',
    categoria: 'Red', prioridad: 'Media', descripcion: 'Wifi intermitente en el piso 3',
    impacto: '', items: [{ codigo: 'AP-003', ubicacion: 'Piso 3' }], estado: 'Pendiente',
  },
  {
    id: 7, solicitante: 'Sofía Herrera', correo: 'sofia.herrera@unibarranquilla.edu.co',
    categoria: 'Software', prioridad: 'Media', descripcion: 'Actualizar antivirus del equipo de tesorería',
    impacto: '', items: [{ codigo: 'PC-410', ubicacion: 'Tesorería' }], estado: 'En proceso',
  },
  {
    id: 8, solicitante: 'Andrés Pérez', correo: 'andres.perez@unibarranquilla.edu.co',
    categoria: 'Hardware', prioridad: 'Alta', descripcion: 'Monitor parpadea en el piso 2',
    impacto: '', items: [{ codigo: 'MON-220', ubicacion: 'Piso 2' }], estado: 'En proceso',
  },
  {
    id: 9, solicitante: 'Valentina Ruiz', correo: 'valentina.ruiz@unibarranquilla.edu.co',
    categoria: 'Accesos', prioridad: 'Baja', descripcion: 'Crear usuario para docente nuevo',
    impacto: '', items: [{ codigo: 'PC-150', ubicacion: 'Sala de profesores' }], estado: 'Resuelta',
  },
  {
    id: 10, solicitante: 'Daniel Ortega', correo: 'daniel.ortega@unibarranquilla.edu.co',
    categoria: 'Hardware', prioridad: 'Media', descripcion: 'Impresora sin tóner en admisiones',
    impacto: '', items: [{ codigo: 'IMP-050', ubicacion: 'Admisiones' }], estado: 'En proceso',
  },
  {
    id: 11, solicitante: 'Camila Torres', correo: 'camila.torres@unibarranquilla.edu.co',
    categoria: 'Software', prioridad: 'Alta', descripcion: 'Error al abrir el correo en Outlook',
    impacto: '', items: [{ codigo: 'PC-512', ubicacion: 'Bienestar' }], estado: 'Pendiente',
  },
  {
    id: 12, solicitante: 'Miguel Rojas', correo: 'miguel.rojas@unibarranquilla.edu.co',
    categoria: 'Red', prioridad: 'Crítica', descripcion: 'Caída del servidor de archivos del piso 1',
    impacto: 'Sin acceso a documentos compartidos', items: [{ codigo: 'SRV-001', ubicacion: 'Centro de datos' }], estado: 'Resuelta',
  },
];
