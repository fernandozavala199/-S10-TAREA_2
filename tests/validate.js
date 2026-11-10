/**
 * Script de validación automatizada para GitHub Actions
 * Verifica integridad de archivos y sintaxis antes del despliegue
 */

const fs = require('fs');
const path = require('path');

console.log('--- 🧪 INICIANDO VALIDACIÓN DE LA APLICACIÓN ---');

// 1. Validar existencia de archivos obligatorios
const requiredFiles = [
    'index.html',
    'css/styles.css',
    'js/app.js',
    'README.md'
];

let hasErrors = false;

requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
        console.log(`✅ Archivo encontrado: ${file}`);
    } else {
        console.error(`❌ ERROR CRÍTICO: Falta el archivo requerido: ${file}`);
        hasErrors = true;
    }
});

// 2. Validación de contenido HTML esencial
const indexPath = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(indexPath)) {
    const htmlContent = fs.readFileSync(indexPath, 'utf-8');
    const essentialElements = [
        'id="incidentForm"',
        'id="filterStatus"',
        'id="incidentsList"',
        'src="js/app.js"'
    ];

    essentialElements.forEach(elem => {
        if (htmlContent.includes(elem)) {
            console.log(`✅ Componente HTML verificado: ${elem}`);
        } else {
            console.error(`❌ ERROR: No se encontró el elemento esencial en index.html: ${elem}`);
            hasErrors = true;
        }
    });
}

if (hasErrors) {
    console.error('\n❌ VALIDACIÓN FALLIDA: Corrija los errores antes del despliegue.');
    process.exit(1);
} else {
    console.log('\n✨ TODAS LAS VALIDACIONES PASARON EXITOSAMENTE. LISTO PARA DESPLIEGUE.');
    process.exit(0);
}
