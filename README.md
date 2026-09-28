# Autoria | Panel de concesionaria

Dashboard gerencial en español para consultar ventas, facturación, margen, inventario, conversión comercial, financiación y operaciones recientes.

## Ejecutar localmente

Requisitos: Node.js 20.19+ o 22.12+ y npm.

```powershell
npm install
npm run dev
```

La consola muestra la URL local. Para validar el proyecto:

```powershell
npm run build
```

## Incluye

- Indicadores con períodos de 7, 30 y 90 días.
- Gráficos de ingresos y participación por marca.
- Búsqueda de operaciones y exportación CSV.
- Alertas de inventario envejecido.
- Diseño responsive para escritorio y móvil.

Los datos son de demostración y están definidos en `src/App.tsx`. No hay API, base de datos, autenticación ni persistencia conectadas.

## Importar en Bolt.new

El flujo oficial para migrar un proyecto existente es importarlo desde GitHub. La carga de archivos en Bolt agrega archivos como contexto; no reemplaza la importación completa de un repositorio.

1. Crea un repositorio vacío en GitHub. Conviene dejarlo privado mientras el proyecto sea de trabajo.
2. Desde PowerShell, en esta carpeta, inicializa y sube el código. Reemplaza la URL por la de tu repositorio:

   ```powershell
   git init -b main
   git add .
   git commit -m "feat: dashboard gerencial de concesionaria"
   git remote add origin https://github.com/USUARIO/REPOSITORIO.git
   git push -u origin main
   ```

3. En la página de inicio de Bolt, selecciona **GitHub**, autoriza el acceso al repositorio y elige **Import from URL** o selecciona el repo de la lista.
4. Una vez importado, abre [`BOLT_NEW_PROMPT.md`](./BOLT_NEW_PROMPT.md) y pega su prompt inicial en Bolt.

No subas claves, datos de clientes ni información comercial real al repositorio. Revisa los permisos de GitHub antes de autorizar Bolt.

Referencias oficiales: [iniciar un proyecto](https://support.bolt.new/building/start-project) y [importar un repositorio de GitHub](https://support.bolt.new/integrations/git).
