import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroService } from '../registro.service';
import { Prioridad } from '../registro.model';
import { sinSoloEspacios } from '../validadores';

@Component({
  selector: 'app-registro-form',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-form.html',
    styleUrl: './registro-form.css',

})
export class RegistroForm {
  private fb = inject(FormBuilder).nonNullable;
  private servicio = inject(RegistroService);

  categorias = ['Hardware', 'Software', 'Red', 'Accesos'];
  prioridades: Prioridad[] = ['Baja', 'Media', 'Alta', 'Crítica'];

  form = this.fb.group({
    solicitante: ['', [Validators.required, Validators.minLength(3), sinSoloEspacios]],
    correo: ['', [Validators.required, Validators.email]],
    categoria: ['', Validators.required],
    prioridad: ['Media' as Prioridad, Validators.required],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    impacto: [''],
  });

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.servicio.agregar({ ...this.form.getRawValue(), items: [] });
    this.form.reset();
  }
}