# 📘 GUÍA DE EJECUCIÓN PASO A PASO: PRÁCTICA GRUPAL SCM & CI/CD
**Asignatura:** Gestión de la Configuración del Software  
**Unidad 3:** Gestión de la construcción y despliegue continuo | **Tema 3:** Despliegue continuo  
**Puntuación:** 10 puntos  

---

## 🧭 Resumen de la Estrategia de Trabajo

Para cumplir con la rúbrica al 100%, el equipo distribuirá las actividades de forma colaborativa simulando un entorno profesional de desarrollo:

| Fase | Requisito Principal | Estrategia de Implementación |
| :--- | :--- | :--- |
| **Fase 1 (SCM - 2 pts)** | Repo, colaboradores, ramas, PRs, $\ge$ 2 commits por integrante | Se crea el repo, se agregan los 4-5 colaboradores y cada integrante aporta mediante ramas temáticas y Pull Requests. |
| **Fase 2 (Releases - 2 pts)** | SemVer: `v1.0.0`, `v1.1.0`, `v1.1.1` con release notes | Creación de tags anotados en Git y publicación formal de Releases en GitHub con sus notas de cambio. |
| **Fase 3 (CI/CD - 3 pts)** | Pipeline en GitHub Actions + Deploy a GitHub Pages | Configuración del archivo `.github/workflows/deploy.yml` con validación previa y despliegue automático. |
| **Fase 4 (Mejora Continua - 2 pts)**| Registro de Issue, asignación, fix vía rama/PR, release `v1.1.1` | Registro del Issue #1 (validación de campos y refresco), creación de rama `fix/issue-1`, PR y evidencia antes/después. |
| **Defensa Práctica (1 pt)** | Explicación técnica ante el docente | Preguntas clave sobre SemVer, ramas, historial Git y pipeline automatizado. |

---

## 🛠️ FASE 1: Actividades en SCM (2 Puntos)

### 1.1 Creación del Repositorio en GitHub
1. Uno de los integrantes (designado como **Administrador/Líder**) crea un repositorio público en GitHub llamado:  
   `sistema-registro-incidencias-scm`
2. En la configuración del repositorio (**Settings > Collaborators**), invita a los otros 3 o 4 compañeros. Cada integrante debe aceptar la invitación en su correo o perfil de GitHub.

### 1.2 Reparto de Commits por Integrante (Garantizar mínimo 2 commits cada uno)
Para asegurar que **cada estudiante tenga al menos 2 commits en el historial**:

- **Integrante 1 (Líder / SCM):**
  - Commit 1: `chore: inicializar repositorio y configuración gitignore`
  - Commit 2: `docs: estructurar README.md con tabla de integrantes`
- **Integrante 2 (Estructura Base - v1.0.0):**
  - Commit 1: `feat: diseñar interfaz base de registro en index.html`
  - Commit 2: `style: añadir estilos visuales y paleta corporativa en styles.css`
- **Integrante 3 (Lógica de Incidencias - v1.0.0):**
  - Commit 1: `feat: implementar almacenamiento local y listado en app.js`
  - Commit 2: `feat: añadir función para eliminar incidencias`
- **Integrante 4 (Nueva Funcionalidad - v1.1.0):**
  - Commit 1: `feat: agregar selector y filtro de incidencias por estado`
  - Commit 2: `feat: incorporar métricas y contadores estadísticos en tiempo real`
- **Integrante 5 (CI/CD & Pruebas):**
  - Commit 1: `ci: configurar script de validación automatizada en tests/validate.js`
  - Commit 2: `ci: configurar workflow de GitHub Actions para despliegue en Pages`

### 1.3 Flujo de Ramas y Pull Requests
Ningún integrante sube cambios directamente a `main`. El flujo es:
1. Crear una rama de trabajo:
   ```bash
   git checkout -b feature/estructura-formulario
   # realizar cambios...
   git add .
   git commit -m "feat: diseñar interfaz base de registro en index.html"
   git push origin feature/estructura-formulario
   ```
2. Ir a GitHub y crear el **Pull Request (PR)** hacia la rama `main`.
3. Otro compañero debe revisar y aprobar el PR (**Code Review**), dejándole un comentario como:  
   *"Revisado y validado. Cumple con los requerimientos de la v1.0.0. Aprobado para merge."*
4. Se realiza el merge hacia `main`.

---

## 🏷️ FASE 2: Formas de Nombrado de Releases (2 Puntos)

El equipo aplicará el estándar **SemVer (Versionamiento Semántico: MAJOR.MINOR.PATCH)**:
- **MAJOR:** Cambios incompatibles con versiones previas.
- **MINOR:** Incorporación de nuevas funcionalidades compatibles hacia atrás.
- **PATCH:** Correcciones de bugs y mejoras de estabilidad sin alterar funcionalidades.

### Paso 1: Crear y etiquetar la versión `v1.0.0`
Una vez que el formulario y la lista básica estén en `main`:
```bash
git checkout main
git pull origin main
git tag -a v1.0.0 -m "Release v1.0.0 - Versión inicial del Sistema de Incidencias"
git push origin v1.0.0
```
En GitHub (**Releases > Draft a new release**):
- **Tag:** `v1.0.0`
- **Título:** `Release v1.0.0 - Versión Inicial y Registro Básico`
- **Notas de versión:**
  ```markdown
  ## 🚀 Versión 1.0.0 - Lanzamiento Inicial
  ### Novedades:
  - Formulario de captura de incidencias con campos: título, prioridad, estado y descripción.
  - Listado dinámico de incidencias registradas con persistencia en LocalStorage.
  - Opciones de cambio de estado y eliminación de incidencias.
  - Interfaz responsiva adaptable a dispositivos móviles.
  ```

### Paso 2: Crear y etiquetar la versión `v1.1.0`
Tras fusionar la rama `feature/filtro-estado` en `main`:
```bash
git checkout main
git pull origin main
git tag -a v1.1.0 -m "Release v1.1.0 - Incorporación de filtro por estado y métricas"
git push origin v1.1.0
```
En GitHub:
- **Tag:** `v1.1.0`
- **Título:** `Release v1.1.0 - Filtros de Incidencias y Métricas en Tiempo Real`
- **Notas de versión:**
  ```markdown
  ## ✨ Versión 1.1.0 - Incorporación de Funcionalidades
  ### Novedades:
  - **Filtro interactivo:** Permite filtrar incidencias por estado (Abierta, En Proceso, Resuelta o Todas).
  - **Panel de control:** Tarjetas métricas superiores con recuento dinámico de incidencias por estado.
  - Badges con código de colores para rápida identificación de prioridad.
  ```

### Paso 3: Crear y etiquetar la versión `v1.1.1`
Tras resolver el Issue #1 mediante una rama de corrección:
```bash
git checkout main
git pull origin main
git tag -a v1.1.1 -m "Release v1.1.1 - Corrección de validación de campos y sincronización"
git push origin v1.1.1
```
En GitHub:
- **Tag:** `v1.1.1`
- **Título:** `Release v1.1.1 - Corrección de Bug en Formulario y Filtro (Issue #1)`
- **Notas de versión:**
  ```markdown
  ## 🐛 Versión 1.1.1 - Corrección de Error (Hotfix)
  ### Correcciones aplicadas:
  - **Fix (Issue #1):** Se corrigió la vulnerabilidad que permitía registrar incidencias vacías con solo espacios en blanco mediante `.trim()`.
  - **Refactor:** Sincronización automática de contadores y refresco reactivo de filtros al agregar o eliminar elementos.
  ```

---

## 🚀 FASE 3: Despliegue de Releases con GitHub Actions & Pages (3 Puntos)

### 3.1 Configuración de GitHub Pages
1. En GitHub, ingresa al repositorio y ve a **Settings > Pages**.
2. En la sección **Build and deployment > Source**, cambia de *"Deploy from a branch"* a:  
   👉 **GitHub Actions**
3. Guarda los cambios.

### 3.2 El Flujo Automatizado (`deploy.yml`)
El archivo `.github/workflows/deploy.yml` ya está creado en tu proyecto. Cada vez que haya un `push` a la rama `main`:
1. El job `validate` corre en un contenedor Ubuntu:
   - Verifica sintaxis: `node --check js/app.js`
   - Valida archivos y componentes HTML: `node tests/validate.js`
2. Si el test pasa (icono verde ✅), se activa el job `deploy`:
   - Empaqueta el sitio web y lo publica automáticamente en **GitHub Pages**.
3. Si el test falla (icono rojo ❌), el despliegue se bloquea protegiendo la producción.

### 3.3 Evidencia de Despliegue
- En la pestaña **Actions** de GitHub se verá la ejecución exitosa con ambos jobs en verde.
- La URL pública será: `https://<usuario>.github.io/<repositorio>/`

---

## 🔄 FASE 4: Releases en Mejora Continua (2 Puntos)

### 4.1 Registrar la Incidencia (Issue) en GitHub
1. Ir a la pestaña **Issues** en GitHub y hacer clic en **New Issue**.
2. **Título:** `[BUG] El formulario permite registrar incidencias vacías y desincroniza filtros`
3. **Cuerpo del Issue:**
   ```markdown
   ### Descripción del Problema
   Al ingresar espacios en blanco en el título o descripción y presionar "Registrar Incidencia", la aplicación crea registros vacíos. Además, al eliminar una incidencia con un filtro activo, los contadores estadísticos de la cabecera no se recalculan inmediatamente.

   ### Pasos para reproducir
   1. Ingresar solo espacios en blanco ("   ") en el campo Título.
   2. Presionar el botón Registrar Incidencia.
   3. Se observa que la tarjeta se genera sin texto.

   ### Comportamiento esperado
   El sistema debe impedir el envío con `.trim()` y notificar al usuario.

   ### Asignado a:
   @usuario_del_integrante_responsable
   ```
4. Asignar formalmente al integrante responsable en el panel lateral derecho (**Assignees**).

### 4.2 Crear la Rama de Corrección y el Pull Request
El integrante asignado ejecuta en su terminal:
```bash
git checkout -b fix/issue-1-validacion-espacios
# Se aplican las correcciones en js/app.js
git add js/app.js
git commit -m "fix: validar campos con trim y sincronizar renderizado (Closes #1)"
git push origin fix/issue-1-validacion-espacios
```
En GitHub:
1. Abrir el Pull Request con título: `Fix: Corrección de validación de formulario y sincronización de contadores`.
2. En la descripción del PR, colocar la palabra clave:  
   `Closes #1` (esto cerrará el Issue automáticamente cuando el PR sea fusionado).
3. Solicitar revisión a otro compañero.
4. Una vez aprobado, hacer el **Merge Pull Request**.

### 4.3 Evidencias Antes y Después
- **Captura "Antes":** Formulario aceptando espacios en blanco y generando una tarjeta vacía.
- **Captura "Después":** Alerta del sistema bloqueando el envío y exigiendo texto válido.

---

## 📄 Estructura del Documento PDF a Entregar (5. Productos a entregar)

El informe final grupal debe tener la siguiente estructura sugerida:

1. **Portada Institucional:**
   - Nombre de la Universidad / Asignatura: *Gestión de la Configuración del Software*.
   - Unidad 3 / Tema 3: *Despliegue Continuo*.
   - Título: *Gestión de versiones y automatización del despliegue de una aplicación mediante GitHub*.
   - Nombres, apellidos y usuarios de GitHub de los 4 a 5 integrantes.
   - Fecha de entrega.
2. **Enlace del Repositorio y URL de Producción:**
   - Link al repositorio público de GitHub.
   - Link de GitHub Pages (ej: `https://usuario.github.io/repo`).
3. **Evidencias de la Fase 1 (SCM):**
   - Captura de la lista de colaboradores del repositorio.
   - Captura del historial de commits (`git log --graph --oneline` o vista de commits en GitHub) demostrando al menos 2 commits por cada integrante.
   - Captura de las ramas creadas y los Pull Requests fusionados con sus revisiones.
4. **Evidencias de la Fase 2 (Releases y SemVer):**
   - Captura de la sección **Releases** en GitHub con las 3 etiquetas visibles: `v1.0.0`, `v1.1.0` y `v1.1.1`.
   - Captura de las notas de versión de cada una explicando los cambios.
5. **Evidencias de la Fase 3 (GitHub Actions & Despliegue):**
   - Captura del archivo de workflow `.github/workflows/deploy.yml`.
   - Captura del historial de ejecuciones en la pestaña **Actions** con los checks en verde.
   - Captura de la aplicación web funcionando en el enlace de GitHub Pages.
6. **Evidencias de la Fase 4 (Mejora Continua):**
   - Captura del Issue #1 creado y asignado.
   - Captura del Pull Request que incluye la referencia `Closes #1`.
   - Comparativa visual: Captura del error **Antes** vs Captura de la corrección **Después**.
7. **Reflexión sobre la Mejora Continua y SCM:**
   - Texto de 2 a 3 párrafos explicando cómo la gestión de la configuración (SCM), la automatización mediante CI/CD y el versionamiento semántico reducen riesgos de regresión, mejoran la calidad del software y permiten entregas rápidas y confiables.

---

## 🎤 Preparación para la Defensa Práctica (1 Punto)

El docente evaluará de forma individual o grupal. A continuación, las preguntas más frecuentes y las respuestas recomendadas:

### ❓ Pregunta 1: "¿Qué representa cada número en el versionamiento semántico v1.1.1?"
* **Respuesta:** "Representa `MAJOR.MINOR.PATCH`. En nuestro caso:
  - `MAJOR (1)` indica la versión principal estable.
  - `MINOR (1)` indica que agregamos una nueva funcionalidad compatible (el filtro por estado y las métricas).
  - `PATCH (1)` indica una corrección de error puntual (el bugfix del Issue #1 sobre validación de entradas y sincronización) sin romper compatibilidad."

### ❓ Pregunta 2: "¿Cómo garantiza el equipo que no se rompa la aplicación al desplegar en GitHub Pages?"
* **Respuesta:** "Gracias al pipeline configurado en GitHub Actions. El despliegue está condicionado por una fase previa (`job: validate`) que comprueba la sintaxis de JavaScript y la integridad de los archivos y elementos DOM con `tests/validate.js`. Solo si esta validación termina con código de salida 0, el job `deploy` se ejecuta."

### ❓ Pregunta 3: "¿Por qué no se debe hacer commit directamente sobre la rama `main`?"
* **Respuesta:** "Porque la rama `main` representa la línea base (baseline) lista para producción. Trabajamos con ramas secundarias (`feature/*` y `fix/*`) y Pull Requests para aislar el desarrollo, facilitar la revisión de código por pares (Code Review) y mantener la trazabilidad de los cambios."

### ❓ Pregunta 4: "¿Cómo se demostró el ciclo de mejora continua en este proyecto?"
* **Respuesta:** "Se identificó una falla o deuda técnica en el software (`Issue #1`), se asignó a un responsable, se ramificó el código para solucionar el problema, se validó mediante pruebas automatizadas y code review en un Pull Request, y se publicó una nueva versión parcheada (`v1.1.1`) con sus notas de versión documentadas."
