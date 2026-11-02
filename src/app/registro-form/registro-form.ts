import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroService } from '../registro.service';
import { Prioridad } from '../registro.model';
import { sinSoloEspacios, impactoSiCritica, minimoItems } from '../validadores';

// Formato del código de equipo: 2 a 4 letras mayúsculas, guion y 3 a 4 dígitos (ej. PC-001)
const PATRON_CODIGO = /^[A-Z]{2,4}-\d{3,4}$/;

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
    items: this.fb.array([this.crearItem()], { validators: [minimoItems(1)] }),
  }, { validators: [impactoSiCritica] });

  get items() {
    return this.form.controls.items;
  }

  private crearItem() {
    return this.fb.group({
      codigo: ['', [Validators.required, Validators.pattern(PATRON_CODIGO)]],
      ubicacion: ['', Validators.required],
    });
  }

  agregarItem(): void {
    this.items.push(this.crearItem());
  }

  quitarItem(indice: number): void {
    this.items.removeAt(indice);
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.servicio.agregar(this.form.getRawValue());
    this.form.reset();
    this.items.clear();
    this.agregarItem();
  }
}