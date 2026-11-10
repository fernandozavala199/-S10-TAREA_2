/**
 * Sistema de Registro de Incidencias
 * Versión actual: v1.1.1
 * 
 * Historial de cambios:
 * - v1.0.0: Registro básico de incidencias y visualización en lista con LocalStorage.
 * - v1.1.0: Incorporación de filtros interactivos por estado y contadores estadísticos.
 * - v1.1.1: Corrección de Bug (Issue #1): 
 *           1. Validación estricta contra cadenas en blanco (.trim()).
 *           2. Corrección en la sincronización de contadores y refresco reactivo del filtro al agregar/eliminar.
 */

// Estructura en LocalStorage
const STORAGE_KEY = 'sistema_incidencias_db';

// Estado de la aplicación
let incidents = [];

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    loadIncidents();
    initEventListeners();
    renderApp();
});

// Cargar incidencias desde LocalStorage (o iniciales si está vacío)
function loadIncidents() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        try {
            incidents = JSON.parse(data);
        } catch (e) {
            console.error('Error al parsear datos de almacenamiento:', e);
            incidents = [];
        }
    } else {
        // Datos de ejemplo para primera carga
        incidents = [
            {
                id: 'INC-1001',
                title: 'Fallo de autenticación en módulo de compras',
                priority: 'Alta',
                status: 'Abierta',
                description: 'Los usuarios reportan error 401 intermitente al intentar finalizar transacciones.',
                createdAt: new Date().toLocaleDateString('es-ES', { hour: '2-digit', minute: '2-digit' })
            },
            {
                id: 'INC-1002',
                title: 'Lentitud al exportar reportes mensuales',
                priority: 'Media',
                status: 'En Proceso',
                description: 'El tiempo de respuesta al generar el PDF excede los 30 segundos.',
                createdAt: new Date().toLocaleDateString('es-ES', { hour: '2-digit', minute: '2-digit' })
            }
        ];
        saveIncidents();
    }
}

// Guardar en LocalStorage
function saveIncidents() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
}

// Configurar escuchadores de eventos
function initEventListeners() {
    const form = document.getElementById('incidentForm');
    const filterSelect = document.getElementById('filterStatus');

    if (form) {
        form.addEventListener('submit', handleAddIncident);
    }

    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            renderIncidentsList();
        });
    }
}

// Manejador para agregar nueva incidencia
function handleAddIncident(event) {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const prioritySelect = document.getElementById('priority');
    const statusSelect = document.getElementById('status');
    const descriptionInput = document.getElementById('description');

    // [v1.1.1 FIX - Issue #1]: Validación de espacios en blanco usando .trim()
    const cleanTitle = titleInput.value.trim();
    const cleanDescription = descriptionInput.value.trim();

    if (!cleanTitle || !cleanDescription) {
        alert('Por favor ingrese un título y una descripción válidos (no se permiten campos con solo espacios).');
        return;
    }

    const newIncident = {
        id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
        title: cleanTitle,
        priority: prioritySelect.value,
        status: statusSelect.value,
        description: cleanDescription,
        createdAt: new Date().toLocaleDateString('es-ES', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit', 
            minute: '2-digit' 
        })
    };

    // Insertar al inicio de la lista
    incidents.unshift(newIncident);
    saveIncidents();

    // Limpiar formulario
    event.target.reset();

    // [v1.1.1 FIX]: Actualización completa del estado de la aplicación
    renderApp();
}

// Eliminar incidencia por ID
function deleteIncident(id) {
    if (confirm(`¿Está seguro de que desea eliminar la incidencia ${id}?`)) {
        incidents = incidents.filter(item => item.id !== id);
        saveIncidents();
        renderApp();
    }
}

// Cambiar estado rápido de una incidencia
function updateIncidentStatus(id, newStatus) {
    const target = incidents.find(item => item.id === id);
    if (target) {
        target.status = newStatus;
        saveIncidents();
        renderApp();
    }
}

// Renderizado completo de la interfaz
function renderApp() {
    updateStatistics();
    renderIncidentsList();
}

// Actualizar contadores y estadísticas (Incorporado en v1.1.0)
function updateStatistics() {
    const total = incidents.length;
    const open = incidents.filter(i => i.status === 'Abierta').length;
    const inProgress = incidents.filter(i => i.status === 'En Proceso').length;
    const resolved = incidents.filter(i => i.status === 'Resuelta').length;

    const elTotal = document.getElementById('totalCount');
    const elOpen = document.getElementById('openCount');
    const elProgress = document.getElementById('progressCount');
    const elResolved = document.getElementById('resolvedCount');

    if (elTotal) elTotal.textContent = total;
    if (elOpen) elOpen.textContent = open;
    if (elProgress) elProgress.textContent = inProgress;
    if (elResolved) elResolved.textContent = resolved;
}

// Renderizado de tarjetas de incidencias (Con filtro por estado de v1.1.0)
function renderIncidentsList() {
    const container = document.getElementById('incidentsList');
    const filterSelect = document.getElementById('filterStatus');
    const currentFilter = filterSelect ? filterSelect.value : 'Todos';

    if (!container) return;

    // Aplicar filtro si no es 'Todos'
    const filtered = currentFilter === 'Todos' 
        ? incidents 
        : incidents.filter(item => item.status === currentFilter);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>🔍 No se encontraron incidencias registradas ${currentFilter !== 'Todos' ? `con estado "${currentFilter}"` : ''}.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(incident => {
        const statusClass = incident.status.replace(/\s+/g, '_');
        return `
            <article class="incident-item">
                <div class="incident-header">
                    <div>
                        <span style="font-size:0.8rem; font-weight:700; color:#64748b;">${escapeHtml(incident.id)}</span>
                        <h3 class="incident-title">${escapeHtml(incident.title)}</h3>
                    </div>
                    <div class="incident-meta">
                        <span class="badge priority-${escapeHtml(incident.priority)}">${escapeHtml(incident.priority)}</span>
                        <span class="badge ${statusClass}">${escapeHtml(incident.status)}</span>
                    </div>
                </div>

                <p class="incident-desc">${escapeHtml(incident.description)}</p>

                <div class="incident-footer">
                    <span>📅 Registrado: ${incident.createdAt}</span>
                    <div class="incident-actions">
                        <select onchange="updateIncidentStatus('${incident.id}', this.value)" style="padding:0.2rem 0.5rem; font-size:0.8rem; width:auto;">
                            <option value="Abierta" ${incident.status === 'Abierta' ? 'selected' : ''}>Abierta</option>
                            <option value="En Proceso" ${incident.status === 'En Proceso' ? 'selected' : ''}>En Proceso</option>
                            <option value="Resuelta" ${incident.status === 'Resuelta' ? 'selected' : ''}>Resuelta</option>
                        </select>
                        <button class="btn btn-danger" onclick="deleteIncident('${incident.id}')">Eliminar</button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

// Función auxiliar de sanitización
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
