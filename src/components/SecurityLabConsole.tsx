import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, Play, RotateCcw, Copy, Check } from 'lucide-react';

interface SecurityLabConsoleProps {
  defenseScore: number;
}

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}

export const SecurityLabConsole: React.FC<SecurityLabConsoleProps> = ({ defenseScore }) => {
  const [inputCommand, setInputCommand] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'sys-info',
      output: `CYBERSHIELD DEFENSIVE TOOLKIT v2.4-ACADEMIC
Terminal de Inspección Criptográfica y Análisis Forense
Campus CSIRT Sandbox Node #88
Escribe "help" para ver la lista de comandos disponibles.`,
      timestamp: '13:40:02',
    },
  ]);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleExecute = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    const now = new Date().toLocaleTimeString();

    let result: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        result = (
          <div className="space-y-1 text-slate-300">
            <p className="text-[#10b981] font-bold">--- COMANDOS DISPONIBLES EN EL LABORATORIO ---</p>
            <p><span className="text-[#38bdf8]">help</span> : Muestra este manual de referencia.</p>
            <p><span className="text-[#38bdf8]">inspect-email &lt;1|2|3|4&gt;</span> : Análisis forense de cabeceras SPF, DKIM y DMARC.</p>
            <p><span className="text-[#38bdf8]">entropy-calc &lt;contraseña&gt;</span> : Calcula entropía de Shannon y tiempo de fuerza bruta.</p>
            <p><span className="text-[#38bdf8]">check-hash &lt;hash-sha256&gt;</span> : Valida integridad de software oficial de la intranet.</p>
            <p><span className="text-[#38bdf8]">scan-wifi</span> : Escaneo de espectro 802.11 y detección de redes Evil Twin.</p>
            <p><span className="text-[#38bdf8]">dns-lookup &lt;dominio&gt;</span> : Rastreo de registros MX/SPF y posibles typosquats.</p>
            <p><span className="text-[#38bdf8]">audit-profile</span> : Genera reporte de preparación defensiva institucional.</p>
            <p><span className="text-[#38bdf8]">clear</span> : Limpia la pantalla de la terminal.</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputCommand('');
        return;

      case 'inspect-email':
        if (!arg || (arg !== '1' && arg !== '2' && arg !== '3' && arg !== '4')) {
          result = (
            <div className="text-amber-400">
              Sintaxis: inspect-email &lt;1|2|3|4&gt; (Ejemplo: inspect-email 1)
            </div>
          );
        } else if (arg === '1') {
          result = (
            <div className="space-y-1">
              <p className="text-red-400 font-bold">[!] ALERTA FORENSE: CORREO SOSPECHOSO #1</p>
              <p className="text-slate-300">From: Soporte Técnico &lt;soporte-alumnos@universidad-cloud-mail.com&gt;</p>
              <p className="text-slate-300">Return-Path: admin-harvest@secure-auth-node.ru</p>
              <p className="text-red-400">SPF Verification: SOFTFAIL (IP 185.220.101.42 no autorizada por DNS)</p>
              <p className="text-red-400">DKIM Signature: FAIL (Firma digital ausente o corrompida)</p>
              <p className="text-red-400">DMARC Policy: REJECT (Acción sugerida: Cuarentena inmediata)</p>
              <p className="text-[#10b981]">Conclusión: Intento activo de robo de credenciales SSO.</p>
            </div>
          );
        } else if (arg === '2') {
          result = (
            <div className="space-y-1">
              <p className="text-[#10b981] font-bold">[✓] CORREO INSTITUCIONAL LEGÍTIMO #2</p>
              <p className="text-slate-300">From: Biblioteca Central &lt;prestamos@biblioteca.universidad.edu&gt;</p>
              <p className="text-[#10b981]">SPF Verification: PASS (IP 198.51.100.25 autorizada por TXT v=spf1)</p>
              <p className="text-[#10b981]">DKIM Signature: PASS (Firma rsa-sha256 válida con llave del dominio)</p>
              <p className="text-[#10b981]">DMARC Policy: PASS (Alineación con biblioteca.universidad.edu)</p>
              <p className="text-slate-300">Conclusión: Mensaje auténtico y seguro para abrir.</p>
            </div>
          );
        } else {
          result = (
            <div className="space-y-1">
              <p className="text-red-400 font-bold">[!] ALERTA CRÍTICA: MALWARE ADJUNTO DETECTADO</p>
              <p className="text-slate-300">Payload: Formulario_Acreditacion_Beca_2026.pdf.exe</p>
              <p className="text-red-400">MIME-Type detectado: application/x-dosexec (PE32 executable)</p>
              <p className="text-red-400">Firma digital de archivo: NO FIRMADO (Untrusted binary)</p>
              <p className="text-amber-400">Conclusión: Intento de infección por troyano de acceso remoto.</p>
            </div>
          );
        }
        break;

      case 'entropy-calc':
        if (!arg) {
          result = (
            <div className="text-amber-400">
              Sintaxis: entropy-calc &lt;contraseña&gt; (Ejemplo: entropy-calc Bosque#Roble$2026)
            </div>
          );
        } else {
          const len = arg.length;
          let pool = 0;
          if (/[a-z]/.test(arg)) pool += 26;
          if (/[A-Z]/.test(arg)) pool += 26;
          if (/[0-9]/.test(arg)) pool += 10;
          if (/[^a-zA-Z0-9]/.test(arg)) pool += 33;
          if (pool === 0) pool = 1;

          const bits = Math.round(len * (Math.log(pool) / Math.log(2)));
          let crackTime = 'Menos de 1 segundo';
          if (bits > 75) crackTime = 'Aproximadamente 42,000 años';
          else if (bits > 60) crackTime = '3 a 6 años';
          else if (bits > 45) crackTime = '2 a 14 días';
          else if (bits > 30) crackTime = '3 minutos';

          result = (
            <div className="space-y-1">
              <p className="text-cyan-400 font-bold">--- EVALUACIÓN CRIPTOGRÁFICA DE CONTRASEÑA ---</p>
              <p className="text-slate-300">Longitud de entrada: {len} caracteres</p>
              <p className="text-slate-300">Espacio de caracteres (Pool): {pool} símbolos posibles</p>
              <p className="text-[#10b981] font-bold">Entropía Shannon estimada: {bits} bits</p>
              <p className="text-slate-300">
                Tiempo de descifrado estimado (Rig 8x RTX 4090 a 100 GH/s):{' '}
                <span className={bits >= 60 ? 'text-[#10b981] font-bold' : 'text-red-400 font-bold'}>
                  {crackTime}
                </span>
              </p>
              <p className="text-slate-400 text-[11px]">
                {bits >= 60
                  ? 'Recomendación: Fortaleza óptima para credenciales de investigación.'
                  : 'Recomendación: Aumenta a una frase de 4 palabras o añade símbolos especiales.'}
              </p>
            </div>
          );
        }
        break;

      case 'check-hash':
        result = (
          <div className="space-y-1">
            <p className="text-cyan-400 font-bold">--- VALIDACIÓN SHA-256 CONTRA REPOSITORIO UNIVERSITARIO ---</p>
            <p className="text-slate-300">Hash ingresado: {arg || '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'}</p>
            <p className="text-[#10b981] font-bold">[✓] COINCIDENCIA CONFIRMADA: Cisco_AnyConnect_VPN_v4.10_Campus.dmg</p>
            <p className="text-slate-300">Firmado digitalmente por: Universidad Central CA (Certificado #9401)</p>
            <p className="text-slate-300">Estado: Archivo íntegro, sin alteraciones por intermediarios.</p>
          </div>
        );
        break;

      case 'scan-wifi':
        result = (
          <div className="space-y-1">
            <p className="text-cyan-400 font-bold">--- ESCANEO DE FRECUENCIAS Wi-Fi EN EL CAMPUS (2.4GHz / 5GHz) ---</p>
            <p className="text-[#10b981]">SSID: "eduroam" | BSSID: 00:1A:2B:3C:4D:5E | Ch: 36 | Seg: WPA3-Enterprise 802.1X [OFICIAL]</p>
            <p className="text-[#10b981]">SSID: "Univ-Visitantes" | BSSID: 00:1A:2B:3C:4D:5F | Ch: 40 | Seg: WPA2-PSK [CAUTIVO]</p>
            <p className="text-red-400 font-bold">
              SSID: "Campus_Alumnos_Gratis" | BSSID: 74:DA:38:91:BB:02 | Ch: 6 | Seg: NONE [ALERTA: EVIL TWIN / ROGUE AP]
            </p>
            <p className="text-amber-400 text-[11px]">
              Advertencia CSIRT: El punto "Campus_Alumnos_Gratis" está clonando el portal para interceptar tráfico de estudiantes. No conectar.
            </p>
          </div>
        );
        break;

      case 'dns-lookup':
        const targetDomain = arg || 'universidad.edu';
        result = (
          <div className="space-y-1">
            <p className="text-cyan-400 font-bold">--- CONSULTA DE REGISTROS DNS PARA: {targetDomain} ---</p>
            <p className="text-slate-300">A Record: 198.51.100.10 (Campus Datacenter Principal)</p>
            <p className="text-slate-300">MX Record: 10 mx1.universidad.edu, 20 mx2.universidad.edu</p>
            <p className="text-[#10b981]">TXT Record: "v=spf1 mx ip4:198.51.100.0/24 -all" [SPF ESTRICTO]</p>
            <p className="text-[#10b981]">DMARC: "v=DMARC1; p=reject; rua=mailto:dmarc@universidad.edu"</p>
            <p className="text-slate-300">Detección de Typosquatting: "@universidad-cloud-mail.com" detectado en registrar externo (En lista negra).</p>
          </div>
        );
        break;

      case 'audit-profile':
        result = (
          <div className="space-y-1">
            <p className="text-cyan-400 font-bold">--- REPORTE DE CUMPLIMIENTO DEFENSIVO INDIVIDUAL ---</p>
            <p className="text-slate-300">Puntaje Global de Postura: <span className="text-[#10b981] font-bold">{defenseScore}%</span></p>
            <p className="text-slate-300">Autenticación Multifactor (2FA): <span className="text-[#10b981]">HABILITADA (TOTP App)</span></p>
            <p className="text-slate-300">Configuración eduroam: <span className="text-[#10b981]">VALIDADA con CAT Tool</span></p>
            <p className="text-slate-300">Cifrado de disco (BitLocker / FileVault): <span className="text-amber-400">RECOMENDADO REVISAR</span></p>
            <p className="text-[#10b981] font-bold">Nivel de preparación: DEFENSOR DIGITAL ACTIVO</p>
          </div>
        );
        break;

      default:
        result = (
          <div className="text-red-400">
            Comando no reconocido: "{cmd}". Escribe <span className="text-white font-bold">help</span> para ver las herramientas disponibles.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        output: result,
        timestamp: now,
      },
    ]);
    setInputCommand('');
  };

  const handleQuickCommand = (cmd: string) => {
    setInputCommand(cmd);
    handleExecute(cmd);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#2563eb] bg-[#eff6ff] px-2.5 py-0.5 rounded-full font-mono">
              SECURITY LAB CLI
            </span>
            <span className="text-xs text-[#64748b]">Consola de Análisis Forense</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0f172a]">
            Laboratorio de Seguridad en Terminal
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl">
            Simula las herramientas que utiliza el equipo de respuesta ante incidentes (CSIRT) para analizar amenazas en el campus.
          </p>
        </div>

        {/* Quick run command pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleQuickCommand('scan-wifi')}
            className="text-xs font-mono bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 text-[#2563eb]" />
            scan-wifi
          </button>
          <button
            onClick={() => handleQuickCommand('inspect-email 1')}
            className="text-xs font-mono bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 text-[#2563eb]" />
            inspect-email 1
          </button>
          <button
            onClick={() => handleQuickCommand('audit-profile')}
            className="text-xs font-mono bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 text-[#2563eb]" />
            audit-profile
          </button>
        </div>
      </div>

      {/* Specialty Component: Interactive Terminal Container in #0f172a */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm text-[#e2e8f0]">
        {/* Terminal Window Header Bar */}
        <div className="bg-[#09111e] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
            <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
            <span className="text-slate-400 text-xs ml-2 font-mono">
              cybershield-sandbox@campus-node: ~
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="hidden sm:inline">UTF-8 · zsh</span>
            <button
              onClick={() => handleExecute('clear')}
              className="text-slate-400 hover:text-white transition-colors"
              title="Limpiar pantalla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-4 sm:p-6 min-h-[420px] max-h-[560px] overflow-y-auto space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[#10b981] font-bold">shield@campus:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
                <span className="text-[10px] text-slate-500 ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4 border-l border-slate-800 py-1">
                {item.output}
              </div>
            </div>
          ))}

          {/* Active input line with #10b981 prompt */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleExecute(inputCommand);
            }}
            className="flex items-center gap-2 pt-2"
          >
            <span className="text-[#10b981] font-bold shrink-0">shield@campus:~$</span>
            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              placeholder="Escribe un comando (ej: help, scan-wifi, inspect-email 1)..."
              className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs sm:text-sm placeholder:text-slate-600"
              autoFocus
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-[#2563eb] text-white text-xs font-semibold hover:bg-[#1d4ed8] transition-colors shrink-0"
            >
              Ejecutar
            </button>
          </form>

          <div ref={bottomRef} />
        </div>

        {/* Terminal Quick Help Bar */}
        <div className="bg-[#09111e] px-4 py-2.5 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <span>Atajos rápidos:</span>
            <button onClick={() => handleQuickCommand('help')} className="text-cyan-400 hover:underline">
              help
            </button>
            <button onClick={() => handleQuickCommand('entropy-calc F1s1ca#Un1v2026!')} className="text-cyan-400 hover:underline">
              entropy-calc
            </button>
            <button onClick={() => handleQuickCommand('check-hash sha256')} className="text-cyan-400 hover:underline">
              check-hash
            </button>
            <button onClick={() => handleQuickCommand('dns-lookup universidad.edu')} className="text-cyan-400 hover:underline">
              dns-lookup
            </button>
          </div>

          <span className="text-slate-500 font-mono">Modo: Estudiante Defensor</span>
        </div>
      </div>
    </div>
  );
};
