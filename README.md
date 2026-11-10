# 🛡️ Sistema de Gestión y Registro de Incidencias TI

![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?logo=githubactions)
![Deploy Status](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen?logo=github)
![Version](https://img.shields.io/badge/Release-v1.1.1-orange)
![SemVer](https://img.shields.io/badge/SemVer-2.0.0-success)

Aplicación web desarrollada para la gestión, registro, control de estados y resolución de incidencias informáticas en entornos organizacionales. Proyecto desarrollado como práctica de la asignatura **Gestión de la Configuración del Software (Unidad 3: Despliegue Continuo)**.

---

## 👥 Integrantes del Equipo (Grupo de Trabajo)

| Nombre y Apellido | Rol en el Proyecto | Usuario de GitHub |
| :--- | :--- | :--- |
| *Estudiante 1* | Integrador SCM / Release Manager | `@usuario1` |
| *Estudiante 2* | Frontend Developer (Formulario & V1) | `@usuario2` |
| *Estudiante 3* | Feature Developer (Filtro v1.1.0) | `@usuario3` |
| *Estudiante 4* | QA / Hotfix Developer (Bugfix v1.1.1) | `@usuario4` |
| *Estudiante 5* | DevOps / CI-CD Engineer (GitHub Actions) | `@usuario5` |

---

## 🎯 Objetivos del Proyecto

- Implementar un flujo de trabajo controlado utilizando **Git** y **GitHub** (ramas, commits, Pull Requests y Code Reviews).
- Aplicar el estándar de **Versionamiento Semántico (SemVer - MAJOR.MINOR.PATCH)**.
- Automatizar la validación y el despliegue continuo (**CI/CD**) hacia **GitHub Pages** mediante **GitHub Actions**.
- Simular el ciclo de vida de desarrollo de software y mejora continua a través de la resolución formal de un **Issue**.

---

## 🚀 Demostración en Vivo (GitHub Pages)

🌐 **URL de Producción:**  
`https://fernandozavala199.github.io/-S10-TAREA_2/`

---

## 📌 Historial de Versiones (Semantic Versioning)

El proyecto evoluciona a través de 3 releases oficiales:

### 🏷️ `v1.0.0` - Versión Inicial (Release Base)
- Creación de la estructura base del proyecto (HTML5 semántico, CSS responsivo y JavaScript Vanilla).
- Formulario interactivo para registrar incidencias con campos: Título, Prioridad (Alta, Media, Baja), Estado Inicial y Descripción.
- Listado dinámico de incidencias almacenadas de forma persistente en `localStorage`.
- Botón de eliminación y visualización de fecha de reporte.

### 🏷️ `v1.1.0` - Incorporación de Funcionalidad (Minor Release)
- **Nueva Funcionalidad:** Selector interactivo para filtrar incidencias por estado (`Abierta`, `En Proceso`, `Resuelta`, `Todos`).
- Incorporación de panel superior de métricas y contadores estadísticos en tiempo real.
- Mejora estética en las tarjetas con códigos de color por prioridad y estado.

### 🏷️ `v1.1.1` - Mejora Continua y Corrección de Error (Patch Release)
- **Corrección vinculada a Issue #1:** Se identificó que se permitía registrar incidencias con cadenas compuestas únicamente por espacios en blanco y los contadores/filtros quedaban desincronizados al insertar o eliminar registros.
- **Solución implementada:** Aplicación de validación `.trim()` estricta y función de renderizado reactivo unificado (`renderApp()`).

---

## ⚙️ Estructura del Repositorio

```text
├── .github/
│   └── workflows/
│       └── deploy.yml        # Flujo automatizado de CI/CD (Test + Deploy a Pages)
├── css/
│   └── styles.css            # Hoja de estilos moderna y responsiva
├── js/
│   └── app.js                # Lógica del cliente y manipulación del DOM
├── tests/
│   └── validate.js           # Pruebas automatizadas de integridad de archivos y HTML
├── index.html                # Interfaz principal de usuario
└── README.md                 # Documentación del proyecto
```

---

## 💻 Instrucciones para Ejecución Local

No se requiere la instalación de servidores web complejos ni bases de datos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/fernandozavala199/-S10-TAREA_2.git
   cd -S10-TAREA_2
   ```

2. **Ejecutar la validación de archivos (Opcional):**
   ```bash
   node tests/validate.js
   ```

3. **Abrir la aplicación:**
   - Hacer doble clic sobre `index.html` en el explorador de archivos, o
   - Utilizar la extensión **Live Server** de Visual Studio Code.

---

## 🔄 Flujo de CI/CD (GitHub Actions)

El archivo `.github/workflows/deploy.yml` ejecuta automáticamente las siguientes fases en cada `push` a la rama `main`:

1. **Job `validate`:** 
   - Descarga el código (`checkout`).
   - Configura el entorno Node.js.
   - Ejecuta `node tests/validate.js` y `node --check js/app.js` para asegurar que el código no contenga errores sintácticos.
2. **Job `deploy`:**
   - Si la validación resulta exitosa, empaqueta los archivos estáticos.
   - Despliega la aplicación directamente en **GitHub Pages** sin intervención manual.
