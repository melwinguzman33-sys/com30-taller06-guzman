import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, map, of, share, switchMap, tap } from 'rxjs';
import { RegistroService } from '../registro.service';
import { Estado, Registro } from '../registro.model';

type Filtro = 'Todos' | Estado;

@Component({
  selector: 'app-busqueda',
  imports: [ReactiveFormsModule],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda {
  private servicio = inject(RegistroService);
  readonly llamadas = this.servicio.llamadas;

  busqueda = new FormControl('', { nonNullable: true });

  // Último texto que pasó por la tubería y estado de la consulta en curso.
  readonly texto = signal('');
  readonly buscando = signal(false);

  // 1. Texto recortado, con pausa de 300 ms y sin repetir el mismo valor.
  private readonly texto$ = this.busqueda.valueChanges.pipe(
    map(t => t.trim()),
    debounceTime(300),
    distinctUntilChanged(),
    tap(t => this.texto.set(t)),
    share(),
  );

  // 2. switchMap: cancela la consulta anterior; bajo 2 caracteres no consulta.
  private readonly resultado$ = this.texto$.pipe(
    switchMap(t => {
      if (t.length < 2) {
        return of<Registro[]>([]);
      }
      this.buscando.set(true);
      return this.servicio.buscar(t).pipe(finalize(() => this.buscando.set(false)));
    }),
  );

  // 3. Resultado expuesto como signal con valor inicial.
  readonly registros = toSignal(this.resultado$, { initialValue: [] as Registro[] });

  // 4. Filtro por estado sobre el resultado: no vuelve a consultar el servicio.
  readonly estados: Estado[] = ['Pendiente', 'En proceso', 'Resuelta'];
  readonly filtro = signal<Filtro>('Todos');

  readonly visibles = computed(() => {
    const f = this.filtro();
    const lista = this.registros();
    return f === 'Todos' ? lista : lista.filter(r => r.estado === f);
  });

  // 6. Historial de las 5 últimas consultas (la más reciente primero).
  //    subscribe con takeUntilDestroyed: se cancela al destruir el componente.
  readonly historial = signal<string[]>([]);

  constructor() {
    this.texto$
      .pipe(
        filter(t => t.length >= 2),
        takeUntilDestroyed(),
      )
      .subscribe(t => this.historial.update(h => [t, ...h].slice(0, 5)));
  }

  // 5. Total y conteo por estado de lo que se muestra.
  readonly total = computed(() => this.visibles().length);
  readonly conteo = computed(() => {
    const lista = this.registros();
    return this.estados.map(e => ({
      estado: e,
      cantidad: lista.filter(r => r.estado === e).length,
    }));
  });
}
