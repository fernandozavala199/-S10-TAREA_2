/**
 * Script de validación automatizada para GitHub Actions
 * Verifica integridad de archivos y sintaxis antes del despliegue
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

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

// 3. Pruebas de comportamiento con dependencias del navegador simuladas
const appPath = path.join(__dirname, '..', 'js', 'app.js');
if (fs.existsSync(appPath)) {
    const elements = {
        title: { value: '' },
        priority: { value: 'Media' },
        status: { value: 'Abierta' },
        description: { value: '' },
        filterStatus: {
            value: 'Todos',
            listeners: {},
            addEventListener(eventName, listener) {
                this.listeners[eventName] = listener;
            }
        },
        totalCount: { textContent: '' },
        openCount: { textContent: '' },
        progressCount: { textContent: '' },
        resolvedCount: { textContent: '' },
        incidentsList: { innerHTML: '' }
    };
    const documentListeners = {};
    const form = {
        listeners: {},
        addEventListener(eventName, listener) {
            this.listeners[eventName] = listener;
        },
        reset() {
            elements.title.value = '';
            elements.priority.value = 'Media';
            elements.status.value = 'Abierta';
            elements.description.value = '';
        }
    };
    elements.incidentForm = form;

    const document = {
        addEventListener(eventName, listener) {
            documentListeners[eventName] = listener;
        },
        getElementById(id) {
            return elements[id] || null;
        }
    };
    let storedIncidents = null;
    const alerts = [];
    const context = {
        document,
        localStorage: {
            getItem() {
                return storedIncidents;
            },
            setItem(key, value) {
                storedIncidents = value;
            }
        },
        alert(message) {
            alerts.push(message);
        },
        confirm() {
            return true;
        }
    };

    vm.runInNewContext(fs.readFileSync(appPath, 'utf8'), context);
    documentListeners.DOMContentLoaded();

    function checkBehavior(condition, description) {
        if (condition) {
            console.log(`✅ Prueba de comportamiento: ${description}`);
        } else {
            console.error(`❌ ERROR: Falló la prueba de comportamiento: ${description}`);
            hasErrors = true;
        }
    }

    checkBehavior(elements.totalCount.textContent === 2, 'carga y cuenta las incidencias iniciales');

    elements.title.value = '   ';
    elements.description.value = 'Descripción válida';
    form.listeners.submit({
        preventDefault() {},
        target: form
    });
    checkBehavior(alerts.length === 1, 'rechaza títulos compuestos solo por espacios');
    checkBehavior(JSON.parse(storedIncidents).length === 2, 'no guarda una incidencia inválida');

    elements.title.value = '  Incidencia de prueba  ';
    elements.description.value = '  Detalle de prueba  ';
    elements.status.value = 'Resuelta';
    form.listeners.submit({
        preventDefault() {},
        target: form
    });
    const savedIncidents = JSON.parse(storedIncidents);
    checkBehavior(
        savedIncidents[0].title === 'Incidencia de prueba'
            && savedIncidents[0].description === 'Detalle de prueba',
        'recorta espacios al guardar una incidencia válida'
    );
    checkBehavior(
        elements.totalCount.textContent === 3 && elements.resolvedCount.textContent === 1,
        'actualiza las métricas después del registro'
    );

    elements.filterStatus.value = 'Abierta';
    elements.filterStatus.listeners.change();
    checkBehavior(
        elements.incidentsList.innerHTML.includes('Fallo de autenticación')
            && !elements.incidentsList.innerHTML.includes('Incidencia de prueba'),
        'filtra la lista por estado'
    );

    context.deleteIncident('INC-1001');
    checkBehavior(
        elements.totalCount.textContent === 2 && elements.openCount.textContent === 0,
        'actualiza las métricas al eliminar una incidencia'
    );
    checkBehavior(
        elements.incidentsList.innerHTML.includes('No se encontraron incidencias'),
        'refresca la lista filtrada después de eliminar'
    );
}

if (hasErrors) {
    console.error('\n❌ VALIDACIÓN FALLIDA: Corrija los errores antes del despliegue.');
    process.exit(1);
} else {
    console.log('\n✨ TODAS LAS VALIDACIONES PASARON EXITOSAMENTE. LISTO PARA DESPLIEGUE.');
    process.exit(0);
}
