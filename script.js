/* --- CONFIGURACIÓN Y BASES DE DATOS AMPLIADAS --- */
const hero = document.getElementById('hero');
let ultimoPosteo = 0; 

const noticias = [
    { 
        id: 1,
        titulo: "Nuevas luminarias en el Arco", 
        cuerpo: "Se instalaron 20 focos LED de alta potencia para mejorar la seguridad en la entrada principal nocturna.", 
        info: "Esta obra contempló la sustitución total del cableado subterráneo y la instalación de lámparas LED de 200W, mejorando la visibilidad un 80%.",
        img: "led.jpg" 
    },
    { 
        id: 2,
        titulo: "Comedor Central operativo", 
        cuerpo: "El servicio de almuerzos ya está disponible para todas las facultades de 11:30 am a 1:30 pm.", 
        info: "Se han habilitado todas las líneas de servicio. Recuerda traer tu ticket o carnet vigente para agilizar el ingreso.",
        img: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=600" 
    },
    { 
        id: 3,
        titulo: "Mantenimiento en FACES", 
        cuerpo: "Cuadrillas de limpieza iniciaron labores en el pabellón 1 de Ciencias Económicas y Sociales.", 
        info: "Los trabajos incluyen desmalezamiento, pintura de pasillos y recuperación de mobiliario para el inicio del semestre.",
        img: "cuadrillas-de-limpieza.jpg" 
    },
    { 
        id: 4,
        titulo: "Ruta Universitaria Activa", 
        cuerpo: "Se incorporan 2 nuevas unidades para la ruta Valencia-Bárbula.", 
        info: "Unidades con mayor capacidad y aire acondicionado. Salidas programadas desde las 7:00 am en la parada principal.",
        img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600" 
    }
];

let alertasComunidad = [
    { usuario: "@FacytUser", msg: "Tubería dañada detectada rumbo a FACYT. Tomen previsiones.", fecha: "Hace 10 min" },
    { usuario: "@IngUC", msg: "Obras en el pasillo central de Ingeniería, paso restringido.", fecha: "Hace 25 min" },
    { usuario: "@Mafe_Ucs", msg: "¡Ojo! El cajero del Banco de Venezuela cerca de FACE no tiene efectivo.", fecha: "Hace 1 hora" }
];

const reportesInfraestructura = [
    { tipo: 'electric', titulo: 'Poste sin luz', ubi: 'Frente a FACE (Estacionamiento)', votos: 42 },
    { tipo: 'vial', titulo: 'Bache profundo', ubi: 'Salida de Ingeniería hacia el Arco', votos: 28 },
    { tipo: 'security', titulo: 'Falta de vigilancia', ubi: 'Pasillo de laboratorios de Química', votos: 56 },
    { tipo: 'infra', titulo: 'Filtración en Techo', ubi: 'Biblioteca Central - Piso 2', votos: 15 },
    { tipo: 'vial', titulo: 'Acera rota', ubi: 'Cerca de la parada de Odontología', votos: 7 },
    { tipo: 'electric', titulo: 'Cable caído', ubi: 'Detrás de la Facultad de Derecho', votos: 23 },
    { tipo: 'infra', titulo: 'Bote de aguas negras', ubi: 'Cerca del Comedor Central', votos: 89 },
    { tipo: 'security', titulo: 'Zona muy oscura', ubi: 'Pasarela de Mañongo', votos: 64 }
];

/* --- SISTEMA DE NOTIFICACIONES PERSONALIZADAS (TOASTS) --- */
function mostrarNotificacion(mensaje, icono = 'ph-info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="ph ${icono}"></i> <span>${mensaje}</span>`;

    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 4000);
}

/* --- VISTA PREVIA DE IMAGEN (SEGURIDAD PARA EL USUARIO) --- */
function actualizarEstadoCarga(input) {
    const statusText = document.getElementById('statusText');
    const cameraIcon = document.getElementById('cameraIcon');
    const uploadContainer = document.querySelector('.upload-container');

    if (input.files && input.files[0]) {
        // 1. Cambiamos el texto
        statusText.innerText = "¡EVIDENCIA CARGADA CON ÉXITO!";
        statusText.style.color = "#2d3748";
        statusText.style.fontWeight = "800";

        // 2. Cambiamos el icono a un check de éxito
        cameraIcon.className = "ph-fill ph-check-circle";
        cameraIcon.style.color = "#38b2ac"; // Color verde éxito

        // 3. Cambiamos el fondo del cuadro para dar feedback visual
        uploadContainer.style.backgroundColor = "#e6fffa";
        uploadContainer.style.borderColor = "#38b2ac";
        
        mostrarNotificacion("Imagen lista para el reporte", "ph-image");
    }
}

/* --- INICIALIZACIÓN DEL MAPA --- */
const map = L.map('map').setView([10.2816, -68.0044], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

/* --- NAVEGACIÓN Y VISTAS --- */
function toggleSeccion(view) {
    document.querySelectorAll('.view').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(`${view}-section`);
    if(target) target.classList.remove('hidden');
    
    if (view === 'news') {
        hero.style.display = 'flex';
        window.scrollTo({ top: hero.offsetHeight, behavior: 'smooth' });
    } else {
        hero.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if(view === 'map') {
        setTimeout(() => { map.invalidateSize(); }, 250);
    }
}

function verDetalleNoticia(id) {
    const n = noticias.find(item => item.id === id);
    if(!n) return;

    const detailBox = document.getElementById('newsDetailContent');
    detailBox.innerHTML = `
        <img src="${n.img}" class="detail-img">
        <h2 style="color: var(--uc-blue); margin-bottom: 10px;">${n.titulo}</h2>
        <p style="font-size: 1.1rem; line-height: 1.6; color: #555;">${n.cuerpo}</p>
        <hr style="margin: 20px 0; opacity: 0.2;">
        <p style="font-size: 1rem; color: #333; font-weight: 500;">${n.info}</p>
        <div style="margin-top: 30px; padding: 15px; background: #f0f4f8; border-radius: 10px; font-size: 0.8rem;">
            Fuente: Dirección de Medios UC | Publicado el 12 de marzo, 2026
        </div>
    `;
    toggleSeccion('news-detail');
}

/* --- LÓGICA DE REPORTES (FIX DEFINITIVO PARA IMÁGENES) --- */
/* --- FUNCIÓN PARA EL DISEÑO DE CARGA DE IMAGEN --- */
function actualizarEstadoCarga(input) {
    // ... (esta función se queda igual)
}

/* --- AQUÍ COMIENZA LA NUEVA PARTE (REEMPLAZA LA ANTERIOR) --- */

/* ============================================================
   ESTE ES EL ENVÍO DEFINITIVO (MODO ANTI-BLOQUEO)
   ============================================================ */
/* --- ENVÍO ESTÁNDAR FORMAL (SOLUCIÓN FINAL) --- */
/* --- ENVÍO DE EMERGENCIA (SIMULANDO IMAGEN) --- */
/* --- SISTEMA DE NOTIFICACIONES PERSONALIZADAS --- */
function mostrarNotificacion(mensaje, icono = 'ph-info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="ph ${icono}"></i> <span>${mensaje}</span>`;

    container.appendChild(toast);
    
    // Desaparece después de 4 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

function confirmarCarga(input) {
    if (input.files && input.files[0]) {
        const area = document.getElementById('areaCarga');
        const texto = document.getElementById('textoEstado');
        const icono = document.getElementById('iconoCamara');

        // Cambios visuales inmediatos
        area.style.backgroundColor = "#e6fffa";
        area.style.borderColor = "#38b2ac";
        
        icono.className = "ph-fill ph-check-circle";
        icono.style.color = "#38b2ac";
        
        texto.innerText = "¡EVIDENCIA CARGADA CON ÉXITO!";
        texto.style.color = "#285e61";
        
        console.log("Imagen cargada: " + input.files[0].name);
    }
}

/* --- ENVÍO DE REPORTE CON NOTIFICACIÓN MODERNA --- */
const formulario = document.getElementById('formReporte');
if(formulario) {
    formulario.onsubmit = function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button');
        btn.innerText = "ENVIANDO REPORTE...";
        btn.disabled = true;

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => { 
            if(key !== "Evidencia") data[key] = value; 
        });
        
        const foto = document.getElementById('archivoEntrada').files[0];
        data["Evidencia_Confirmada"] = foto ? "Adjunta: " + foto.name : "Sin foto";

        fetch(this.action, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // NOTIFICACIÓN DE ÉXITO (Aquí está el cambio)
                mostrarNotificacion("¡Reporte enviado exitosamente!", "ph-check-circle");
                this.reset();
                
                // Reset visual del área de carga
                document.getElementById('areaCarga').style.backgroundColor = "";
                document.getElementById('areaCarga').style.borderColor = "#ccc";
                document.getElementById('textoEstado').innerText = "Toca para capturar evidencia";
                document.getElementById('iconoCamara').className = "ph ph-camera";
                
                setTimeout(() => cerrarModal(), 2000);
            } else {
                mostrarNotificacion("Error en el servidor", "ph-warning-octagon");
            }
        })
        .catch(() => {
            mostrarNotificacion("Sin conexión a internet", "ph-wifi-slash");
        })
        .finally(() => {
            btn.innerText = "ENVIAR REPORTE";
            btn.disabled = false;
        });
    };
}


/* --- ALERTAS COMUNITARIAS --- */
function publicarAlerta() {
    const input = document.getElementById('inputAlerta');
    const mensaje = input.value.trim();
    const ahora = Date.now();
    
    if (mensaje === "") return;

    if (ahora - ultimoPosteo < 180000) {
        const segundosRestantes = Math.ceil((180000 - (ahora - ultimoPosteo)) / 1000);
        mostrarNotificacion(`Espera ${Math.floor(segundosRestantes/60)}m ${segundosRestantes%60}s.`, "ph-clock");
        return;
    }

    const nuevaAlerta = { usuario: "@ComunidadUC", msg: mensaje, fecha: "Ahora mismo" };
    alertasComunidad.unshift(nuevaAlerta);
    ultimoPosteo = ahora;
    input.value = "";
    renderAlertas();
    actualizarEstadisticas();
    mostrarNotificacion("Alerta publicada", "ph-megaphone");
}

/* --- RENDERS Y ESTADÍSTICAS --- */
function actualizarEstadisticas() {
    const totalReportes = reportesInfraestructura.length + alertasComunidad.length;
    const valorPrincipal = document.querySelector('.stat-value');
    if(valorPrincipal) valorPrincipal.innerText = totalReportes;

    const criticos = reportesInfraestructura.filter(r => r.tipo === 'vial' || r.tipo === 'security').length;
    const miniValores = document.querySelectorAll('.mini-data strong');
    
    if(miniValores.length > 0) {
        miniValores[0].innerText = criticos; 
        miniValores[2].innerText = Math.floor(totalReportes * 0.6); 
    }
}

function renderNoticias() {
    const list = document.getElementById('newsList');
    if(!list) return;
    list.innerHTML = noticias.map(n => `
        <div class="news-card" onclick="verDetalleNoticia(${n.id})">
            <div class="news-media"><img src="${n.img}"></div>
            <div class="news-body">
                <span style="color: var(--uc-orange); font-size: 0.7rem; font-weight: 800;">OFICIAL UC</span>
                <h4>${n.titulo}</h4>
                <p>${n.cuerpo}</p>
                <div style="margin-top:10px; color: var(--uc-blue); font-weight: 800; font-size: 0.8rem;">LEER MÁS...</div>
            </div>
        </div>
    `).join('');
}

function renderAlertas() {
    const list = document.getElementById('alertsList');
    if(!list) return;
    list.innerHTML = alertasComunidad.map(a => `
        <div class="alert-card">
            <div class="alert-header" style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <strong style="color: var(--uc-blue);">${a.usuario}</strong> 
                <span style="font-size: 0.75rem; color: #999;">${a.fecha}</span>
            </div>
            <p style="font-size: 0.9rem; line-height: 1.4;">${a.msg}</p>
        </div>
    `).join('');
}

function renderReportes() {
    const list = document.getElementById('reportsList');
    if(!list) return;
    list.innerHTML = reportesInfraestructura.map(r => `
        <div class="news-card" style="margin-bottom: 12px; padding: 18px; display: flex; align-items: center; gap: 15px; border-left: 4px solid var(--uc-blue);">
            <div style="background: #f0f4f8; padding: 12px; border-radius: 12px;">
                <i class="ph ${r.tipo === 'electric' ? 'ph-lightning' : r.tipo === 'vial' ? 'ph-road-horizon' : r.tipo === 'security' ? 'ph-shield-warning' : 'ph-drop'}" style="font-size: 1.6rem; color: var(--uc-blue);"></i>
            </div>
            <div style="flex: 1;">
                <h4 style="margin: 0; font-size: 1rem; font-weight: 700;">${r.titulo}</h4>
                <p style="margin: 3px 0 0 0; font-size: 0.8rem; color: #777;"><i class="ph ph-map-pin"></i> ${r.ubi}</p>
            </div>
            <div style="text-align: center; background: #fff4e6; padding: 5px 10px; border-radius: 8px;">
                <div style="font-weight: 800; color: var(--uc-orange); font-size: 0.9rem;"><i class="ph ph-caret-up"></i> ${r.votos}</div>
                <span style="font-size: 0.6rem; color: var(--uc-orange); font-weight: bold; text-transform: uppercase;">votos</span>
            </div>
        </div>
    `).join('');
}

/* --- EVENTOS UI --- */
function abrirModal() { document.getElementById('modalReporte').style.display = 'block'; }
function cerrarModal() { document.getElementById('modalReporte').style.display = 'none'; }

window.addEventListener('scroll', () => {
    if (hero.style.display !== 'none') {
        let scrollPos = window.scrollY;
        let heroHeight = hero.offsetHeight;
        if (scrollPos < heroHeight) {
            hero.style.opacity = 1 - (scrollPos / heroHeight);
            hero.style.filter = `blur(${scrollPos * 0.03}px)`;
        }
    }
});

function inicializarApp() {
    renderNoticias();
    renderReportes();
    renderAlertas();
    actualizarEstadisticas(); 
}

inicializarApp();