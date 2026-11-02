import { Component, inject } from '@angular/core';
import { RegistroService } from '../registro.service';

@Component({
  selector: 'app-resumen',
  template: `
    <section class="resumen">
      <span>Total: <strong>{{ servicio.total() }}</strong></span>
      <span>Pendientes: <strong>{{ servicio.pendientes() }}</strong></span>
    </section>
  `,
})
export class Resumen {
  servicio = inject(RegistroService);
}
