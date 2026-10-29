import { AbstractControl, ValidationErrors } from '@angular/forms';

export function sinSoloEspacios(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (typeof valor !== 'string' || valor.length === 0) {
    return null; // el vacío lo valida Validators.required
  }
  return valor.trim().length === 0 ? { soloEspacios: true } : null;
}