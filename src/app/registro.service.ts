import { Injectable, signal, computed } from '@angular/core';
import { Registro, Estado } from './registro.model';

@Injectable({ providedIn: 'root' })
export class RegistroService {
  private readonly _registros = signal<Registro[]>([]);
  readonly registros = this._registros.asReadonly();

  readonly total = computed(() => this._registros().length);
  readonly pendientes = computed(
    () => this._registros().filter(r => r.estado === 'Pendiente').length
  );

  private siguienteId = 1;

  agregar(datos: Omit<Registro, 'id' | 'estado'>): void {
    this._registros.update(lista => [
      ...lista,
      { ...datos, id: this.siguienteId++, estado: 'Pendiente' },
    ]);
  }

  cambiarEstado(id: number, estado: Estado): void {
    this._registros.update(lista =>
      lista.map(r => (r.id === id ? { ...r, estado } : r))
    );
  }

  eliminar(id: number): void {
    this._registros.update(lista => lista.filter(r => r.id !== id));
  }
}