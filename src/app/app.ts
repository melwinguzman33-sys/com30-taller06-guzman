import { Component, inject } from '@angular/core';
import { RegistroForm } from './registro-form/registro-form';
import { Resumen } from './resumen/resumen';
import { RegistroService } from './registro.service';
import { Estado } from './registro.model';

@Component({
  selector: 'app-root',
  imports: [RegistroForm, Resumen],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  servicio = inject(RegistroService);
  estados: Estado[] = ['Pendiente', 'En proceso', 'Resuelta'];

  cambiarEstado(id: number, estado: string): void {
    this.servicio.cambiarEstado(id, estado as Estado);
  }

  eliminar(id: number): void {
    this.servicio.eliminar(id);
  }
}
