# COM30 · Talleres 06 y 07 · Mesa de ayuda de TI

**Autor:** Melwin David Guzmán Guzmán
**Curso:** COM30 Programación con Frameworks para Web · 2026-III · Institución Universitaria de Barranquilla

## Escenario

E1 · Mesa de ayuda de TI. Una sola pantalla para registrar y gestionar solicitudes de soporte
(solicitante, correo institucional, categoría, prioridad, descripción, impacto y equipos afectados).
Los datos viven en memoria, en `RegistroService`. No hay rutas ni HttpClient.

- **Taller 06:** formulario reactivo con validadores propios y de grupo, FormArray de equipos,
  servicio con signals, listado con `@for`/`@empty` y resumen con `@defer`.
- **Taller 07:** búsqueda reactiva sobre las solicitudes (componente `src/app/busqueda`).

## Taller 07 · Búsqueda reactiva

| Pieza | Dónde |
|---|---|
| Semilla de 12 registros (3 estados) | `src/app/semilla.ts` |
| `buscar(texto)` con retardo `max(150, 1500 − 300 × longitud)` ms y signal `llamadas` con `asReadonly()` | `src/app/registro.service.ts` |
| `FormControl` → `valueChanges` → `map(trim)` → `debounceTime(300)` → `distinctUntilChanged()` → `switchMap` (`of([])` bajo 2 caracteres) | `src/app/busqueda/busqueda.ts` |
| `toSignal` con valor inicial, filtro por estado con `signal` + `computed`, total y conteo por estado | `src/app/busqueda/busqueda.ts` |
| Historial de 5 consultas con `subscribe` + `takeUntilDestroyed()` | `src/app/busqueda/busqueda.ts` |
| Mensajes: mínimo 2 caracteres, «Buscando…», «Sin coincidencias» (`@empty`), `@for` con `track` | `src/app/busqueda/busqueda.html` |

**Regla de búsqueda:** sin tildes ni mayúsculas, el texto recortado con `trim()` debe estar contenido
en el campo **solicitante** o en el campo **descripción**. Con menos de 2 caracteres no se consulta.

## Cómo ejecutar

Requisitos: Node.js 20 o superior y npm.

```bash
git clone https://github.com/melwinguzman33-sys/com30-taller06-guzman.git
cd com30-taller06-guzman
npm install
npx ng serve
```

Abrir `http://localhost:4200/`. Para compilar la versión de producción:

```bash
npx ng build
```
