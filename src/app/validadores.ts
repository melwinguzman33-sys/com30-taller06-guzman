import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function sinSoloEspacios(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (typeof valor !== 'string' || valor.length === 0) {
    return null; // el vacío lo valida Validators.required
  }
  return valor.trim().length === 0 ? { soloEspacios: true } : null;
}

// Validador de grupo: impactoSiCritica
// Compara los campos 'prioridad' e 'impacto': si la prioridad es 'Crítica'
// y el impacto está vacío o solo tiene espacios, el grupo es inválido.
// Clave de error: 'impactoRequerido'
export const impactoSiCritica: ValidatorFn = (
  grupo: AbstractControl
): ValidationErrors | null => {
  const prioridad = grupo.get('prioridad')?.value;
  const impacto = grupo.get('impacto')?.value;
  const falta =
    prioridad === 'Crítica' &&
    (typeof impacto !== 'string' || impacto.trim().length === 0);
  return falta ? { impactoRequerido: true } : null;
};