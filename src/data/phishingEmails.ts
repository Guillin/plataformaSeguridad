import { PhishingEmail } from '../types';

export const PHISHING_EMAILS_DATA: PhishingEmail[] = [
  {
    id: 'email-1',
    subject: 'URGENTE: Migración del Buzón Institucional y Alerta de Capacidad',
    senderName: 'Soporte Técnico Universitario',
    senderAddress: 'soporte-alumnos@universidad-cloud-mail.com',
    replyToAddress: 'admin-harvest@secure-auth-node.ru',
    timestamp: 'Hoy, 08:42 AM',
    isPhishing: true,
    category: 'Soporte IT',
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1e293b;">
        <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 16px;">
          <h3 style="color: #0f172a; margin: 0; font-size: 18px;">Servicio de Informática y Comunicaciones del Campus</h3>
        </div>
        <p>Estimado(a) alumno(a) / docente,</p>
        <p>Se le notifica que su buzón de correo electrónico institucional <strong>ha superado el 94% de su cuota de almacenamiento</strong> permitida para el ciclo académico vigente.</p>
        <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 12px; margin: 16px 0; color: #991b1b;">
          <strong>ADVERTENCIA:</strong> Para evitar la pérdida permanente de mensajes y la suspensión de su acceso al aula virtual en las próximas <strong>12 horas</strong>, debe validar su identidad de inmediato.
        </div>
        <p>Por favor, sincronice y aumente la cuota de su cuenta haciendo clic en el siguiente enlace de verificación:</p>
        <p style="text-align: center; margin: 24px 0;">
          <a href="#simulated-malicious-url" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
            Validar y Aumentar Cuota de Buzón Ahora
          </a>
        </p>
        <p style="font-size: 12px; color: #64748b;">Destino del enlace: <code>https://auth-univ-portal.serveo.net/login/sso-verify?id=93821</code></p>
        <p style="font-size: 13px; color: #64748b; margin-top: 24px;">Atentamente,<br>Mesa de Ayuda de Tecnologías de la Información<br>Campus Central</p>
      </div>
    `,
    redFlags: [
      'El dominio remitente "@universidad-cloud-mail.com" es falso; no coincide con el dominio oficial universitario (ej. @universidad.edu).',
      'Dirección Reply-To apunta a un servidor externo desconocido (.ru).',
      'Sentido de urgencia artificial: amenaza con suspender la cuenta en 12 horas si no se actúa ya.',
      'El enlace de verificación dirige a "serveo.net", un servicio de tunelado frecuentemente abusado por ciberdelincuentes para phishing.',
      'La autenticación fallida en encabezados: SPF SOFTFAIL y DMARC FAIL.'
    ],
    legitimateMarkers: [],
    explanation: 'Este es un caso clásico de "Phishing de Cuota de Correo". Los atacantes intentan inducir pánico mediante amenazas de suspensión para que la víctima ingrese sus credenciales en un clon del portal SSO.',
    headers: {
      spf: 'SOFTFAIL',
      dkim: 'FAIL',
      dmarc: 'FAIL',
      returnPath: 'bounce-collector@secure-auth-node.ru',
      receivedFromIp: '185.220.101.42 (Tor Exit Node / Hosting no reconocido)'
    }
  },
  {
    id: 'email-2',
    subject: 'Recordatorio de Préstamo de Material Bibliográfico #BIB-2026-904',
    senderName: 'Biblioteca Central Universitaria',
    senderAddress: 'prestamos@biblioteca.universidad.edu',
    timestamp: 'Ayer, 04:15 PM',
    isPhishing: false,
    category: 'Biblioteca',
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1e293b;">
        <div style="border-bottom: 2px solid #059669; padding-bottom: 12px; margin-bottom: 16px;">
          <h3 style="color: #0f172a; margin: 0; font-size: 18px;">Sistema Integrado de Bibliotecas Universitarias (SIBU)</h3>
        </div>
        <p>Estimado(a) usuario(a),</p>
        <p>Le recordamos que los siguientes libros en préstamo tienen fecha de vencimiento próxima:</p>
        <ul style="color: #334155; margin: 12px 0; padding-left: 20px;">
          <li><em>Sistemas Distribuidos: Principios y Paradigmas</em> — Vence: 12 de Octubre</li>
          <li><em>Criptografía Aplicada y Seguridad en Redes</em> — Vence: 14 de Octubre</li>
        </ul>
        <p>Puede renovar sus libros ingresando directamente con su sesión institucional activa en el catálogo oficial en <a href="#simulated-legit-url" style="color: #2563eb; text-decoration: underline;">https://biblioteca.universidad.edu/catalogo/mi-cuenta</a> o acudiendo a los módulos de autoservicio.</p>
        <p>No se requiere ninguna confirmación de contraseña por este medio.</p>
        <p style="font-size: 13px; color: #64748b; margin-top: 24px;">Saludos cordiales,<br>Módulo de Circulación y Préstamos<br>Biblioteca Central</p>
      </div>
    `,
    redFlags: [],
    legitimateMarkers: [
      'Dominio oficial legítimo: @biblioteca.universidad.edu',
      'No exige contraseñas ni contiene enlaces de login sospechosos.',
      'Encabezados técnicos válidos: SPF PASS, DKIM PASS y DMARC PASS.',
      'No emplea amenazas ni lenguaje alarmista, solo información de consulta ordinaria.'
    ],
    explanation: 'Mensaje completamente legítimo. Proviene del subdominio oficial de la biblioteca, cuenta con registros SPF/DKIM aprobados y no solicita introducir credenciales ni ejecutar ficheros.',
    headers: {
      spf: 'PASS',
      dkim: 'PASS',
      dmarc: 'PASS',
      returnPath: 'notificaciones@biblioteca.universidad.edu',
      receivedFromIp: '198.51.100.25 (Servidor de Correo Institucional Autorizado)'
    }
  },
  {
    id: 'email-3',
    subject: 'Convocatoria Extraordinaria de Becas Santander & Movilidad Internacional 2026',
    senderName: 'Programa de Becas y Movilidad Estudiantil',
    senderAddress: 'becas-extraordinarias@santander-becas-edu.org',
    replyToAddress: 'finanzas-coordinacion@temp-mail.org',
    timestamp: 'Hoy, 10:18 AM',
    isPhishing: true,
    category: 'Beca',
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1e293b;">
        <div style="background-color: #004ac6; color: white; padding: 14px; border-radius: 6px; margin-bottom: 16px;">
          <h3 style="margin: 0; font-size: 18px;">Fondo de Becas de Excelencia Académica y Pasantías</h3>
        </div>
        <p>¡Felicitaciones!</p>
        <p>Tu expediente académico ha sido preseleccionado para recibir una <strong>Beca de Ayuda Directa de $1,800 EUR</strong> para el presente semestre.</p>
        <p>Para formalizar la aceptación y el depósito bancario de los fondos, debes descargar el formulario de acreditación adjunto y enviar tu firma antes de las 15:00 horas:</p>
        <div style="border: 1px dashed #cbd5e1; border-radius: 8px; padding: 12px; margin: 16px 0; background-color: #f8fafc;">
          <span style="font-weight: 600; color: #0f172a;">Archivo adjunto:</span>
          <span style="display: block; font-family: monospace; color: #b91c1c; margin-top: 4px;">Formulario_Acreditacion_Beca_2026.pdf.exe (3.4 MB)</span>
        </div>
        <p style="font-size: 12px; color: #dc2626;">* Nota: Si su antivirus advierte sobre el archivo, desactívelo temporalmente debido a la firma digital del banco.</p>
        <p style="font-size: 13px; color: #64748b; margin-top: 24px;">Comité de Asignación de Recursos<br>Fundación de Becas Estudiantiles</p>
      </div>
    `,
    redFlags: [
      'El archivo adjunto tiene doble extensión maliciosa: ".pdf.exe". Es un archivo ejecutable que instalaría un troyano en tu computadora.',
      'El cuerpo del correo te pide descaradamente desactivar tu antivirus.',
      'Remitente falso con dominio no oficial ("@santander-becas-edu.org") y Reply-To en servicio desechable ("@temp-mail.org").',
      'Promesa de dinero fácil o subsidios no solicitados sin haber postulado previamente.',
      'Encabezados técnicos con fallas críticas: SPF FAIL, DMARC FAIL.'
    ],
    legitimateMarkers: [],
    explanation: 'Ataque de malware y robo de identidad dirigido. Utiliza el gancho emocional de una beca económica para inducir a la víctima a ejecutar un archivo ".pdf.exe" y desactivar las protecciones de seguridad.',
    headers: {
      spf: 'FAIL',
      dkim: 'NONE',
      dmarc: 'FAIL',
      returnPath: 'bounce@vps-malware-distributor.net',
      receivedFromIp: '94.102.61.12 (Servidor VPS de origen sospechoso)'
    }
  },
  {
    id: 'email-4',
    subject: 'Actualización Urgente de Cuenta Bancaria para Depósito de Nómina / Honorarios',
    senderName: 'Departamento de Recursos Humanos y Nómina',
    senderAddress: 'rrhh-nomina@universidad.edu.payroll-portal.info',
    timestamp: 'Hace 2 días',
    isPhishing: true,
    category: 'Nómina Docente',
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1e293b;">
        <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px;">
          <h3 style="color: #0f172a; margin: 0; font-size: 18px;">Dirección de Gestión de Capital Humano y Nómina</h3>
        </div>
        <p>A todo el personal docente y de investigación:</p>
        <p>Debido a la migración bancaria del campus hacia una nueva entidad financiera, requerimos que <strong>confirmen y actualicen los datos de su cuenta bancaria (IBAN / CLABE)</strong> para garantizar la liquidación de su próxima quincena.</p>
        <p>Aquellos colaboradores que no actualicen su ficha antes del viernes sufrirán retención temporal de pagos.</p>
        <p style="text-align: center; margin: 20px 0;">
          <a href="#simulated-payroll-link" style="background-color: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">
            Ingresar al Módulo de Nómina y Confirmar Datos
          </a>
        </p>
        <p style="font-size: 12px; color: #64748b;">Enlace: <code>https://universidad-edu.payroll-portal.info/login.php</code></p>
        <p style="font-size: 13px; color: #64748b; margin-top: 24px;">Atentamente,<br>Área de Pagos y Liquidaciones</p>
      </div>
    `,
    redFlags: [
      'Subdominio engañoso: "universidad.edu.payroll-portal.info". El dominio real es "payroll-portal.info", no "universidad.edu".',
      'Amenaza con retención de salarios u honorarios si no se actúa con prisa.',
      'Los departamentos de recursos humanos no gestionan cambios bancarios mediante enlaces en correos masivos no autenticados.',
      'Headers no autorizados (SPF Softfail, sin firma criptográfica DKIM).'
    ],
    legitimateMarkers: [],
    explanation: 'Ataque de tipo "Business Email Compromise" (BEC) / suplantación de nómina docente. El objetivo es desviar depósitos de sueldo a cuentas controladas por los atacantes.',
    headers: {
      spf: 'SOFTFAIL',
      dkim: 'NONE',
      dmarc: 'FAIL',
      returnPath: 'mailer@payroll-portal.info',
      receivedFromIp: '103.224.182.240'
    }
  }
];
