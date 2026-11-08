import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize, map, of, share, switchMap, tap } from 'rxjs';
import { RegistroService } from '../registro.service';
import { Registro } from '../registro.model';

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
}
