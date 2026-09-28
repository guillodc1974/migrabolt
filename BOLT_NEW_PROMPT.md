# Prompt inicial para Bolt.new

Importé un proyecto existente de GitHub llamado `concesionaria-dashboard`. Continúa desde el código actual: no lo recrees desde cero.

## Objetivo

Mantener y evolucionar un dashboard gerencial en español para una concesionaria de autos. Debe servir para que gerencia consulte ventas, facturación, margen bruto, unidades en stock, conversión de leads, financiación, operaciones recientes y unidades con stock envejecido.

## Código y stack existentes

- Vite 8, React 19 y TypeScript 6.
- `lucide-react` para iconos, `recharts` para gráficos.
- `@fontsource/dm-sans` y `@fontsource/space-grotesk` para tipografías locales.
- Entrada visual principal en `src/App.tsx`; estilos en `src/App.css` y `src/index.css`.
- `npm run dev` inicia el entorno; `npm run build` comprueba TypeScript y genera el build.

## Comportamiento que debe conservarse

- Selector de rango: 7, 30 y 90 días; actualiza indicadores y serie del gráfico.
- Búsqueda de operaciones y exportación CSV de las operaciones visibles.
- Navegación interna entre resumen, análisis, operaciones e inventario.
- Diseño responsive, etiquetas en español y formato regional `es-AR`.
- Mantener jerarquía visual, paleta verde y acentos cálidos, tipografías y densidad del dashboard existente.

## Límites de esta migración

Los registros y métricas actuales son datos de demostración dentro de `src/App.tsx`. El proyecto todavía no tiene backend, base de datos, autenticación ni conexión a un DMS/CRM. No presentes los valores de ejemplo como datos reales, no inventes integraciones ni solicites secretos en el chat. No añadas Bolt Database, Supabase u otro servicio sin confirmar primero el modelo de datos, los permisos y la integración que se desea.

## Primer paso solicitado

1. Inspecciona el repositorio importado y confirma que entiendes su estructura y las funcionalidades existentes.
2. Ejecuta `npm run build` antes de modificar código e informa cualquier error preexistente.
3. No reemplaces el dashboard ni elimines dependencias/configuración que ya funcionan.
4. Propón un plan breve para el próximo cambio solicitado. Si el cambio requiere datos reales, persistencia, autenticación o APIs, pregunta primero qué sistema debe ser la fuente de verdad.
5. Implementa solo el cambio que se pida, conservando TypeScript, accesibilidad, responsive y los patrones visuales existentes; vuelve a ejecutar `npm run build` al terminar.
