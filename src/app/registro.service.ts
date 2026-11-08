import { Injectable, signal, computed } from '@angular/core';
import { Observable, defer, delay, of } from 'rxjs';
import { Registro, Estado } from './registro.model';
import { SEMILLA } from './semilla';

// Quita tildes y pasa a minúsculas para comparar sin importar acentos ni mayúsculas.
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

@Injectable({ providedIn: 'root' })
export class RegistroService {
  private readonly _registros = signal<Registro[]>(SEMILLA);
  readonly registros = this._registros.asReadonly();

  readonly total = computed(() => this._registros().length);
  readonly pendientes = computed(
    () => this._registros().filter(r => r.estado === 'Pendiente').length
  );

  // T07: contador de consultas al servicio, de solo lectura hacia afuera.
  private readonly _llamadas = signal(0);
  readonly llamadas = this._llamadas.asReadonly();

  private siguienteId = SEMILLA.length + 1;

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

  // T07: búsqueda simulada.
  // Regla: sin tildes ni mayúsculas, el texto recortado está contenido en
  // «solicitante» o en «descripcion».
  // Retardo: max(150, 1500 − 300 × longitud) ms. Cada suscripción cuenta una llamada.
  buscar(texto: string): Observable<Registro[]> {
    return defer(() => {
      this._llamadas.update(n => n + 1);
      const t = normalizar(texto.trim());
      const resultado = this._registros().filter(
        r => normalizar(r.solicitante).includes(t) || normalizar(r.descripcion).includes(t)
      );
      const retardo = Math.max(150, 1500 - 300 * texto.trim().length);
      return of(resultado).pipe(delay(retardo));
    });
  }
}
