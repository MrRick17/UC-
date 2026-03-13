/* --- CONFIGURACIÓN Y BASES DE DATOS AMPLIADAS --- */
const hero = document.getElementById('hero');
let usuarioActivo = null; // Variable para guardar al usuario identificado

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

/* --- DETALLE DE NOTICIA CON TEXTO EXTENSO --- */
function verDetalleNoticia(id) {
    // Buscamos la noticia en tu array
    const n = noticias.find(item => item.id === id);
    if(!n) return;
    
    const detailBox = document.getElementById('newsDetailContent');
    // ... tu código de innerHTML ...
    
    // Llamamos a la navegación
    toggleSeccion('news-detail');

    // Refuerzo extra específico para el detalle
    setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);

    
    
    // Creamos el bloque de mucho texto de relleno con estilo profesional
    const textoExtenso = `
        <p style="font-size: 1.1rem; color: #444; line-height: 1.8; margin-bottom: 20px;">
            <strong>${n.info || n.cuerpo}</strong>
        </p>
        <p style="font-size: 1rem; color: #555; line-height: 1.7; margin-bottom: 20px;">
            Además de las medidas iniciales, la Dirección de Infraestructura ha planificado una segunda fase de intervención que abarcará las áreas adyacentes. Este esfuerzo conjunto busca no solo resolver la contingencia inmediata, sino establecer un protocolo de mantenimiento preventivo a largo plazo. Las autoridades han reiterado su compromiso con la mejora continua de los espacios académicos y administrativos, priorizando siempre el bienestar de la comunidad estudiantil y del personal docente.
        </p>
        <p style="font-size: 1rem; color: #555; line-height: 1.7; margin-bottom: 20px;">
            Durante las próximas semanas, se llevarán a cabo mesas de trabajo con los representantes estudiantiles para evaluar el impacto de estas obras. Se espera que, mediante la participación activa de todos los sectores que hacen vida en el campus, se puedan identificar nuevas áreas de oportunidad. La dotación de insumos y la optimización de los recursos asignados forman parte de una estrategia integral de recuperación institucional.
        </p>
        <p style="font-size: 1rem; color: #555; line-height: 1.7;">
            Finalmente, se hace un llamado a la consciencia y al sentido de pertenencia de cada individuo que transita por estos espacios. El cuidado de las instalaciones es una responsabilidad compartida. Cualquier eventualidad o daño detectado debe ser canalizado inmediatamente a través de esta plataforma de reportes para garantizar una respuesta oportuna y eficaz por parte de las cuadrillas de mantenimiento.
        </p>
    `;

    // Armamos la vista completa
    detailBox.innerHTML = `
        <img src="${n.img}" style="width: 100%; border-radius: 15px; margin-bottom: 25px; height: 250px; object-fit: cover; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        
        <span style="color: var(--uc-orange); font-weight: 800; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Boletín Informativo</span>
        
        <h2 style="color: var(--uc-blue); margin: 10px 0 25px 0; font-size: 1.8rem; line-height: 1.2;">${n.titulo}</h2>
        
        <div style="background: white; padding: 25px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); text-align: justify;">
            ${textoExtenso}
        </div>
        
        <div style="margin-top: 30px; padding: 15px; border-left: 4px solid var(--uc-orange); background: #f8f9fa; border-radius: 0 10px 10px 0; font-size: 0.85rem; color: #666;">
            <strong>Fuente:</strong> Dirección de Medios e Infraestructura Institucional <br>
            <strong>Publicación:</strong> Marzo 2026
        </div>
    `;
    
    // Cambiamos a la vista de detalle
    toggleSeccion('news-detail');
}

function toggleSeccion(view) {
    // 1. Ocultar todas las secciones
    document.querySelectorAll('.view').forEach(s => {
        s.classList.add('hidden');
    });

    // 2. Mostrar la sección destino
    const target = document.getElementById(`${view}-section`);
    if(target) {
        target.classList.remove('hidden');
    }

    // 3. Control del Hero
    const hero = document.getElementById('hero');
    if(hero) hero.style.display = (view === 'news') ? 'flex' : 'none';

    // --- LA SOLUCIÓN MAESTRA: El retraso de ejecución ---
    // Usamos 10ms para que el navegador primero pinte el cambio y luego haga el scroll
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        
        // Si el contenedor tiene scroll interno, lo reseteamos también
        if(target) target.scrollTop = 0;
    }, 10);

    if(view === 'map') {
        setTimeout(() => { map.invalidateSize(); }, 300);
    }
}



const reportesInfraestructura = [
    { tipo: 'electric', titulo: 'Poste sin luz', ubi: 'Frente a FACE', votos: 42 },
    { tipo: 'vial', titulo: 'Bache profundo', ubi: 'Salida de Ingeniería', votos: 28 },
    { tipo: 'security', titulo: 'Falta de vigilancia', ubi: 'Pasillo de Química', votos: 56 },
    { tipo: 'infra', titulo: 'Bote de aguas negras', ubi: 'Cerca del Comedor', votos: 89 }
];

/* --- SISTEMA DE IDENTIFICACIÓN (LOGIN) --- */
const formLogin = document.getElementById('formLogin');
if(formLogin) {
    formLogin.onsubmit = function(e) {
        e.preventDefault();
        usuarioActivo = {
            nombre: document.getElementById('nombreUsuario').value,
            apellido: document.getElementById('apellidoUsuario').value,
            correo: document.getElementById('correoUsuario').value
        };
        document.getElementById('loginOverlay').style.display = 'none';
        mostrarNotificacion(`Bienvenido, ${usuarioActivo.nombre}`, "ph-user-circle");
    };
}

/* --- SISTEMA DE NOTIFICACIONES (TOASTS) --- */
function mostrarNotificacion(mensaje, icono = 'ph-info') {
    // 1. Buscamos o creamos el contenedor
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // 2. Creamos el Toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.opacity = '1'; // Aseguramos visibilidad
    toast.innerHTML = `<i class="ph ${icono}"></i> <span>${mensaje}</span>`;

    container.appendChild(toast);
    
    // 3. Animación de salida y auto-eliminación
    setTimeout(() => {
        toast.style.transition = "0.5s";
        toast.style.opacity = '0';
        toast.style.transform = "translateY(-20px)";
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

/* --- VISTA PREVIA Y CONFIRMACIÓN DE CARGA --- */
function confirmarCarga(input) {
    if (input.files && input.files[0]) {
        const area = document.getElementById('areaCarga');
        const texto = document.getElementById('textoEstado');
        const icono = document.getElementById('iconoCamara');

        area.style.backgroundColor = "#e6fffa";
        area.style.borderColor = "#38b2ac";
        icono.className = "ph-fill ph-check-circle";
        icono.style.color = "#38b2ac";
        texto.innerText = "¡EVIDENCIA CARGADA CON ÉXITO!";
        texto.style.color = "#285e61";
    }
}

/* --- VOTACIÓN FUNCIONAL --- */
function votarReporte(index) {
    reportesInfraestructura[index].votos++;
    renderReportes(); // Refresca la lista para mostrar el nuevo número
    mostrarNotificacion("Voto registrado correctamente", "ph-arrow-fat-up");
}

/* --- ENVÍO DE REPORTE CON DATOS PERSONALES --- */
const formulario = document.getElementById('formReporte');

if (formulario) {
    formulario.onsubmit = function(e) {
        e.preventDefault(); // Evita que la página se recargue
        
        const btn = document.getElementById('btnEnviar');
        const textoOriginal = btn.innerText;
        
        btn.innerText = "ENVIANDO REPORTE...";
        btn.disabled = true;

        // Recolectamos datos
        const formData = new FormData(this);
        const data = {
            Nombre_Usuario: `${usuarioActivo.nombre} ${usuarioActivo.apellido}`,
            Correo: usuarioActivo.correo,
            Falla: formData.get('Tipo_Falla'),
            Descripcion: formData.get('Descripcion'),
            Fecha: new Date().toLocaleString()
        };

        // El envío real
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
                // ÉXITO: Mostramos notificación azul
                mostrarNotificacion("¡Reporte enviado exitosamente!", "ph-check-circle");
                this.reset(); // Limpia el formulario
                
                // Reset de la imagen cargada (si usas la función de éxito)
                const area = document.getElementById('areaCarga');
                if(area) {
                    area.style.backgroundColor = "";
                    area.style.borderColor = "#ccc";
                    document.getElementById('textoEstado').innerText = "Toca para capturar evidencia";
                }

                // Cerramos el modal después de 2 segundos
                setTimeout(() => cerrarModal(), 2000);
            } else {
                mostrarNotificacion("Error al enviar. Intenta de nuevo.", "ph-warning-octagon");
            }
        })
        .catch(error => {
            mostrarNotificacion("Sin conexión con el servidor", "ph-wifi-slash");
        })
        .finally(() => {
            btn.innerText = textoOriginal;
            btn.disabled = false;
        });
    };
}

/* --- SISTEMA DE ALERTAS (CHAT EN VIVO) FUNCIONAL --- */
let ultimoPosteo = 0; // Guardamos el tiempo del último mensaje

function publicarAlerta() {
    const input = document.getElementById('inputAlerta');
    const mensaje = input.value.trim();
    const ahora = Date.now();
    const TIEMPO_ESPERA = 3 * 60 * 1000; // 3 minutos

    if (mensaje === "") {
        mostrarNotificacion("Escribe un mensaje", "ph-warning");
        return;
    }

    if (ahora - ultimoPosteo < TIEMPO_ESPERA) {
        const restante = Math.ceil((TIEMPO_ESPERA - (ahora - ultimoPosteo)) / 1000);
        mostrarNotificacion(`Espera ${Math.floor(restante/60)}:${(restante%60).toString().padStart(2,'0')} para alertar de nuevo`, "ph-clock");
        return;
    }

    // Insertar el nuevo mensaje al principio de la lista
    alertasComunidad.unshift({ 
        usuario: `@${usuarioActivo.nombre}_${usuarioActivo.apellido.charAt(0)}`, 
        msg: mensaje, 
        fecha: "Ahora mismo" 
    });

    ultimoPosteo = ahora;
    input.value = ""; 
    renderAlertas(); // Volvemos a dibujar la lista con el nuevo mensaje
    mostrarNotificacion("Mensaje enviado al muro", "ph-paper-plane-tilt");
}

function renderAlertas() {
    const list = document.getElementById('alertsList');
    if(!list) return;

    list.innerHTML = alertasComunidad.map(a => `
        <div class="alert-card" style="background: white; padding: 15px; border-radius: 12px; margin-bottom: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 4px solid var(--uc-orange);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <strong style="color: var(--uc-blue); font-size: 0.85rem; font-weight: 800;">${a.usuario}</strong>
                <span style="font-size: 0.7rem; color: #999;">${a.fecha}</span>
            </div>
            <p style="margin: 0; font-size: 0.9rem; color: #444; line-height: 1.4;">${a.msg}</p>
        </div>
    `).join('');
}



let alertasComunidad = [
    { 
        usuario: "@Maria_G", 
        msg: "El transporte para Naguanagua acaba de salir, el próximo viene en 20 min.", 
        fecha: "Hace 5 min" 
    },
    { 
        usuario: "@Carlos_R", 
        msg: "Mucha cola en el comedor central, tomen sus previsiones.", 
        fecha: "Hace 15 min" 
    },
    { 
        usuario: "@Ana_P", 
        msg: "Hay jornada de carnetización en el auditorio de Faces hoy hasta las 2pm.", 
        fecha: "Hace 1 hora" 
    }
];

/* --- RENDER DE ALERTAS MEJORADO --- */
function renderAlertas() {
    const list = document.getElementById('alertsList');
    if(!list) return;

    list.innerHTML = alertasComunidad.map(a => `
        <div class="alert-card" style="background: white; padding: 12px; border-radius: 12px; margin-bottom: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 4px solid var(--uc-orange);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <strong style="color: var(--uc-blue); font-size: 0.85rem;">${a.usuario}</strong>
                <span style="font-size: 0.7rem; color: #999;">${a.fecha}</span>
            </div>
            <p style="margin: 0; font-size: 0.9rem; color: #444; line-height: 1.4;">${a.msg}</p>
        </div>
    `).join('');
}

/* --- NAVEGACIÓN Y VISTAS --- */
const map = L.map('map').setView([10.2816, -68.0044], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function toggleSeccion(view) {
    document.querySelectorAll('.view').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(`${view}-section`);
    if(target) target.classList.remove('hidden');
    hero.style.display = (view === 'news') ? 'flex' : 'none';
    if(view === 'map') setTimeout(() => { map.invalidateSize(); }, 250);
}

/* --- RENDERS --- */
function renderReportes() {
    const list = document.getElementById('reportsList');
    if(!list) return;
    list.innerHTML = reportesInfraestructura.map((r, index) => `
        <div class="news-card" style="margin-bottom: 12px; padding: 18px; display: flex; align-items: center; gap: 15px; border-left: 4px solid var(--uc-blue);">
            <div style="background: #f0f4f8; padding: 12px; border-radius: 12px;">
                <i class="ph ${r.tipo === 'electric' ? 'ph-lightning' : 'ph-warning'}" style="font-size: 1.6rem; color: var(--uc-blue);"></i>
            </div>
            <div style="flex: 1;">
                <h4 style="margin: 0; font-size: 1rem;">${r.titulo}</h4>
                <p style="margin: 0; font-size: 0.8rem; color: #777;">${r.ubi}</p>
            </div>
            <div onclick="votarReporte(${index})" style="text-align: center; background: #fff4e6; padding: 5px 10px; border-radius: 8px; cursor: pointer;">
                <div style="font-weight: 800; color: var(--uc-orange);"><i class="ph ph-caret-up"></i> ${r.votos}</div>
                <span style="font-size: 0.6rem; color: var(--uc-orange); font-weight: bold;">VOTAR</span>
            </div>
        </div>
    `).join('');
}

function renderNoticias() {
    const list = document.getElementById('newsList');
    if(!list) return;
    list.innerHTML = noticias.map(n => `
        <div class="news-card" onclick="verDetalleNoticia(${n.id})">
            <div class="news-media"><img src="${n.img}"></div>
            <div class="news-body">
                <h4>${n.titulo}</h4>
                <p>${n.cuerpo}</p>
            </div>
        </div>
    `).join('');
}

function abrirModal() { document.getElementById('modalReporte').style.display = 'block'; }
function cerrarModal() { document.getElementById('modalReporte').style.display = 'none'; }

/* --- INICIALIZACIÓN GLOBAL --- */
function inicializarApp() {
    // 1. Cargamos las noticias (con la imagen arriba y texto abajo)
    renderNoticias(); 
    
    // 2. Cargamos los reportes de infraestructura con sus votos
    renderReportes(); 
    
    // 3. Cargamos los mensajes de ejemplo en el chat
    renderAlertas(); 
    
    // 4. Actualizamos los números de las estadísticas
    actualizarEstadisticas();
    
    console.log("App UC Responde inicializada correctamente.");
}



// IMPORTANTE: Llamamos a la función para que todo aparezca
inicializarApp();

inicializarApp();