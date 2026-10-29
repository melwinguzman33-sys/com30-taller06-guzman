import { Component, inject } from '@angular/core';
import { RegistroForm } from './registro-form/registro-form';
import { RegistroService } from './registro.service';

@Component({
  selector: 'app-root',
  imports: [RegistroForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  servicio = inject(RegistroService);
}