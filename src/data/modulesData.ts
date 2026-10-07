import { ModuleLesson } from '../types';

export const MODULES_DATA: ModuleLesson[] = [
  {
    id: 'phishing-academico',
    title: 'Phishing e Ingeniería Social en el Campus',
    category: 'Ingeniería Social',
    durationMinutes: 15,
    description: 'Aprende a identificar correos fraudulentos que suplantan a la Dirección Académica, coordinadores de becas y soporte de correo institucional.',
    realCampusScenario: 'Un correo llega un viernes a las 18:00 hrs con el asunto "URGENTE: Tu cuota de buzón institucional ha excedido el 98%. Haz clic aquí antes de 24 hrs o tu cuenta será suspendida". Al hacer clic, pide tu clave única de estudiante en un portal que imita al campus pero con dominio "@campus-univ-login.net".',
    learningPoints: [
      'Identificar la falsa urgencia artificial y amenazas de bloqueo de cuenta.',
      'Diferenciar entre el nombre visible ("Soporte IT") y la dirección real (servidor externo desconocido).',
      'Comprobar la barra de estado y el dominio real antes de introducir cualquier credencial universitaria.'
    ],
    threatIndicators: [
      'Remitente con dominios similares pero falsos (typosquatting).',
      'Archivos adjuntos inesperados con dobles extensiones (.pdf.exe o .zip).',
      'Enlaces que ocultan la URL real mediante acortadores o hipervínculos engañosos.'
    ],
    practicalTips: [
      'Pasa el cursor sobre los enlaces antes de hacer clic para inspeccionar el destino real.',
      'El equipo de cómputo universitario NUNCA te pedirá tu contraseña por correo.',
      'Reporta de inmediato cualquier mensaje sospechoso al CSIRT universitario.'
    ],
    quiz: {
      question: 'Recibes un correo firmado supuestamente por "Vicerrectoría Académica" ofreciendo una subvención extraordinaria de $1,200 USD si confirmas tu usuario y clave antes de medianoche en un formulario de Google Docs. ¿Cuál es la acción segura?',
      options: [
        'Completar el formulario de inmediato para no perder el beneficio económico.',
        'Reenviar el formulario a compañeros de clase para consultar su opinión.',
        'Ignorar el formulario, no ingresar credenciales y reportar el correo al equipo de seguridad de la universidad.',
        'Responder al correo pidiendo que verifiquen su identidad antes de mandar la contraseña.'
      ],
      correctIndex: 2,
      explanation: 'Las autoridades universitarias jamás solicitan contraseñas por formularios públicos ni usan canales informales para becas con plazos de pocas horas.'
    }
  },
  {
    id: 'higiene-credenciales-2fa',
    title: 'Higiene de Contraseñas, 2FA y Passkeys',
    category: 'Credenciales',
    durationMinutes: 12,
    description: 'Fortalece el acceso a la intranet, sistemas de calificaciones y bibliotecas digitales mediante contraseñas robustas y autenticación multifactor.',
    realCampusScenario: 'Un estudiante reutilizaba la misma clave en su portal universitario y en una web externa de apuntes. La web de apuntes sufrió una filtración de datos y atacantes usaron "Credential Stuffing" para acceder a su expediente y cambiar sus opciones de matrícula.',
    learningPoints: [
      'La reutilización de contraseñas es el vector número uno en ataques contra estudiantes.',
      'Cómo la autenticación de dos factores (2FA / TOTP con app de autenticación) frena el 99% de accesos no autorizados.',
      'Uso de gestores de contraseñas de código abierto o institucionales para generar claves largas y únicas.'
    ],
    threatIndicators: [
      'Intentos de inicio de sesión desde ubicaciones geográficas anómalas.',
      'Notificaciones push de 2FA que no solicitaste (ataques de fatiga 2FA / MFA bombing).',
      'Páginas de login que carecen de certificado SSL válido o usan HTTP simple.'
    ],
    practicalTips: [
      'Usa una frase de paso (passphrase) de 4 palabras aleatorias en lugar de claves cortas con números.',
      'Prioriza aplicaciones autenticadoras (como Google Authenticator o Microsoft Authenticator) sobre SMS.',
      'Nunca apruebes una notificación de autenticación que tú no hayas desencadenado en ese instante.'
    ],
    quiz: {
      question: 'Te llega una notificación a tu celular diciendo "Aprobar inicio de sesión en Portal Universitario" mientras estás comiendo con amigos sin tocar tu computadora. ¿Qué debes hacer?',
      options: [
        'Aprobarla rápidamente para que la notificación no siga sonando.',
        'Rechazarla de inmediato, cambiar tu contraseña universitaria y notificar a seguridad informática.',
        'Esperar 10 minutos y luego aprobarla para ver quién fue.',
        'Reiniciar el teléfono pensando que es un error de software.'
      ],
      correctIndex: 1,
      explanation: 'Rechazarla detiene el acceso no autorizado inmediato. Cambiar tu clave previene que el atacante vuelva a intentar el MFA bombing.'
    }
  },
  {
    id: 'redes-eduroam-vpn',
    title: 'Seguridad en Redes Wi-Fi Universitarias & VPN',
    category: 'Redes',
    durationMinutes: 14,
    description: 'Navega seguro en el campus, cafeterías y residencias. Identifica ataques Evil Twin y configura la red eduroam correctamente con certificados institucionales.',
    realCampusScenario: 'En los pasillos de la facultad de ingeniería aparece una red abierta llamada "Campus_Alumnos_Gratis". Un estudiante se conecta y el atacante intercepta su tráfico no cifrado mediante un ataque Man-in-the-Middle (MitM).',
    learningPoints: [
      'Configurar eduroam usando el instalador oficial con certificado de validación 802.1X.',
      'Riesgos de redes públicas sin contraseña: intercepción de paquetes y suplantación de DNS.',
      'Uso de la VPN institucional cuando trabajas desde tu hogar para acceder a bases de datos científicas.'
    ],
    threatIndicators: [
      'Redes Wi-Fi que llevan nombres como "WiFi_Abierto_Universidad" sin cifrado WPA2/WPA3 Enterprise.',
      'Alertas de certificado SSL en el navegador al abrir páginas que normalmente son seguras.',
      'Petición de instalar un perfil de configuración no firmado en tu smartphone.'
    ],
    practicalTips: [
      'Utiliza siempre la red "eduroam" configurada mediante la herramienta CAT de tu universidad.',
      'Desactiva la conexión automática a redes Wi-Fi abiertas en tus dispositivos.',
      'Activa la VPN institucional para acceder a recursos restringidos como IEEE Xplore o JSTOR desde fuera del campus.'
    ],
    quiz: {
      question: '¿Por qué la red oficial "eduroam" es más segura que una red abierta de cafetería para realizar tus trámites universitarios?',
      options: [
        'Porque eduroam es más rápida gracias a servidores locales.',
        'Porque cifra individualmente el tráfico de cada usuario usando WPA2/WPA3 Enterprise y autenticación 802.1X.',
        'Porque no requiere que ingreses ninguna contraseña.',
        'Porque bloquea todas las redes sociales automáticamente.'
      ],
      correctIndex: 1,
      explanation: 'El cifrado WPA2/WPA3 Enterprise con 802.1X aísla la sesión de cada usuario, impidiendo que otros en la misma sala intercepten tus datos.'
    }
  },
  {
    id: 'proteccion-datos-investigacion',
    title: 'Protección de Datos de Investigación & Privacidad',
    category: 'Datos',
    durationMinutes: 18,
    description: 'Salvaguarda tesis, patentes, datos sensibles de pacientes/encuestas y código fuente contra filtraciones y espionaje académico.',
    realCampusScenario: 'Un grupo de investigación médica almacenó datos clínicos de 500 pacientes voluntarios en una carpeta pública de Google Drive sin control de acceso por enlace. Un bot indexador encontró los archivos y expuso información confidencial.',
    learningPoints: [
      'Clasificación de información académica: Pública, Interna, Confidencial y Restringida.',
      'Almacenamiento conforme a regulaciones de privacidad y comités de ética.',
      'Anonimización y cifrado de bases de datos antes de compartirlas para análisis estadístico.'
    ],
    threatIndicators: [
      'Enlaces de Drive compartidos como "Cualquier persona con el enlace puede editar".',
      'Uso de memorias USB compartidas sin cifrado BitLocker/FileVault para transportar datos de tesis.',
      'Repositorios de GitHub públicos que contienen accidentalmente credenciales y API keys de servidores del laboratorio.'
    ],
    practicalTips: [
      'Cifra los discos duros y memorias donde almacenes proyectos de grado o investigación.',
      'Revisa periódicamente los permisos de carpetas compartidas y revoca accesos de colaboradores inactivos.',
      'Utiliza herramientas como git-secrets para evitar subir claves privadas a repositorios.'
    ],
    quiz: {
      question: 'Estás colaborando en un proyecto de investigación con investigadores de otra universidad. ¿Cuál es la forma más segura de compartir el conjunto de datos preliminar?',
      options: [
        'Subirlo a un servicio de transferencia rápida sin contraseña para mayor comodidad.',
        'Enviarlo por correo a sus direcciones personales de Yahoo/Gmail.',
        'Compartirlo mediante el repositorio institucional de almacenamiento en la nube, restringido únicamente a sus correos institucionales autenticados.',
        'Subirlo en una memoria USB y dejarla en recepción.'
      ],
      correctIndex: 2,
      explanation: 'El almacenamiento institucional permite auditar los accesos, aplicar cifrado en reposo y restringir la lectura estrictamente a cuentas institucionales verificadas.'
    }
  },
  {
    id: 'malware-descargas-academicas',
    title: 'Malware, Ransomware & Software Académico Pirata',
    category: 'Amenazas',
    durationMinutes: 15,
    description: 'Evita infecciones por troyanos al buscar software de simulación científica (Matlab, SPSS, AutoCAD) y libros de texto digitales en sitios no verificados.',
    realCampusScenario: 'Un estudiante de arquitectura buscaba una versión crackeada de un software de modelado 3D. El activador (keygen) contenía un info-stealer que extrajo sus cookies de sesión de Discord, navegadores y su token de acceso al aula virtual.',
    learningPoints: [
      'Los "cracks" y activadores gratuitos son la principal vía de infección por troyanos ladrones de credenciales (Stealers).',
      'Verificación de sumas de verificación (checksums SHA-256 / MD5) antes de instalar software institucional.',
      'Aislamiento inmediato de un equipo universitario si muestra signos de ransomware.'
    ],
    threatIndicators: [
      'Archivos comprimidos protegidos con contraseña en foros de descarga para eludir el antivirus.',
      'Ejecutables que solicitan desactivar el antivirus antes de abrirse.',
      'Ralentización drástica del equipo y aparición de extensiones desconocidas en tus documentos.'
    ],
    practicalTips: [
      'Utiliza los convenios universitarios: la universidad provee licencias educativas legítimas de software científico.',
      'Verifica el hash SHA-256 de las imágenes ISO o instaladores oficiales.',
      'Mantén siempre copias de seguridad de tus proyectos en al menos dos medios independientes (regla 3-2-1).'
    ],
    quiz: {
      question: 'Descargas un PDF de un manual de laboratorio desde un blog externo, pero al ver el archivo en el explorador notas que se llama "Manual_Fisica_2026.pdf.vbs". ¿Qué debes sospechar?',
      options: [
        'Es un formato moderno y comprimido de PDF.',
        'Es un script malicioso de Visual Basic que finge ser un documento para engañarte y ejecutarse en tu sistema.',
        'Es un archivo legítimo de la universidad con versión de biblioteca.',
        'No hay ningún riesgo porque contiene la palabra "pdf".'
      ],
      correctIndex: 1,
      explanation: 'Los atacantes aprovechan la extensión oculta de Windows para disfrazar scripts ejecutables (.vbs, .exe, .scr) con iconos y nombres de PDFs.'
    }
  },
  {
    id: 'seguridad-movil-byod',
    title: 'Seguridad Móvil & Políticas BYOD en el Campus',
    category: 'Móvil',
    durationMinutes: 10,
    description: 'Protege tu teléfono personal y laptop (Bring Your Own Device) al conectarlos a los sistemas académicos y redes de investigación.',
    realCampusScenario: 'Una profesora perdió su tablet sin contraseña en una sala de conferencias. En la tablet tenía abierta la sesión de la plataforma de calificaciones de 300 alumnos y acceso directo al correo institucional.',
    learningPoints: [
      'Activación de bloqueo biométrico y PIN de al menos 6 dígitos en dispositivos móviles.',
      'Habilitación del servicio de localización y borrado remoto (Find My / Encontrar mi dispositivo).',
      'Gestión de permisos de aplicaciones: cámara, micrófono y ubicación.'
    ],
    threatIndicators: [
      'Instalación de aplicaciones fuera de tiendas oficiales (sideloading de APKs sin verificar).',
      'Dispositivos con "Root" o "Jailbreak" que deshabilitan las capas de seguridad del sistema operativo.',
      'Mensajes SMS de smishing suplantando a la empresa de mensajería del campus.'
    ],
    practicalTips: [
      'Configura el bloqueo automático de pantalla en 1 o 2 minutos máximo.',
      'Nunca dejes tus dispositivos desatendidos en la biblioteca o salas de estudio, ni por 30 segundos.',
      'Aplica las actualizaciones de seguridad de iOS y Android en cuanto estén disponibles.'
    ],
    quiz: {
      question: '¿Qué medida técnica inmediata te permite proteger la información institucional si te roban la laptop en el transporte público?',
      options: [
        'Llamar al número telefónico de la laptop.',
        'Tener activado el cifrado completo de disco (BitLocker / FileVault) y cambiar de inmediato las contraseñas de tus cuentas desde otro equipo.',
        'Esperar a que la batería se descargue para que nadie pueda ver los archivos.',
        'Comprar otra laptop idéntica.'
      ],
      correctIndex: 1,
      explanation: 'El cifrado de disco completo impide que extraigan el disco duro y lean los archivos sin tu clave de desbloqueo, y cambiar las claves revoca los accesos en la nube.'
    }
  }
];
