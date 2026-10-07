import React, { useState } from 'react';
import { PHISHING_EMAILS_DATA } from '../data/phishingEmails';
import { PhishingEmail } from '../types';
import { 
  Mail, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  ExternalLink, 
  Search, 
  Inbox, 
  Flag, 
  Code2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface PhishingSimulatorViewProps {
  onSolveCase: (emailId: string, success: boolean) => void;
  solvedEmails: string[];
}

export const PhishingSimulatorView: React.FC<PhishingSimulatorViewProps> = ({
  onSolveCase,
  solvedEmails,
}) => {
  const [selectedEmailId, setSelectedEmailId] = useState<string>(PHISHING_EMAILS_DATA[0].id);
  const [showHeaders, setShowHeaders] = useState<boolean>(false);
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [verdictSubmitted, setVerdictSubmitted] = useState<boolean>(false);
  const [userVerdictIsPhishing, setUserVerdictIsPhishing] = useState<boolean | null>(null);

  const currentEmail = PHISHING_EMAILS_DATA.find((e) => e.id === selectedEmailId) || PHISHING_EMAILS_DATA[0];

  const handleSelectEmail = (email: PhishingEmail) => {
    setSelectedEmailId(email.id);
    setShowHeaders(false);
    setSelectedFlags([]);
    setVerdictSubmitted(false);
    setUserVerdictIsPhishing(null);
  };

  const handleToggleFlag = (flag: string) => {
    if (verdictSubmitted) return;
    if (selectedFlags.includes(flag)) {
      setSelectedFlags(selectedFlags.filter((f) => f !== flag));
    } else {
      setSelectedFlags([...selectedFlags, flag]);
    }
  };

  const handleSubmitVerdict = (isPhishing: boolean) => {
    setUserVerdictIsPhishing(isPhishing);
    setVerdictSubmitted(true);
    const isCorrect = isPhishing === currentEmail.isPhishing;
    onSolveCase(currentEmail.id, isCorrect);
  };

  const handleResetCurrentCase = () => {
    setVerdictSubmitted(false);
    setUserVerdictIsPhishing(null);
    setSelectedFlags([]);
    setShowHeaders(false);
  };

  const isCurrentSolved = solvedEmails.includes(currentEmail.id);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Explanation */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#2563eb] bg-[#eff6ff] px-2.5 py-0.5 rounded-full font-mono">
              SIMULADOR FORENSE
            </span>
            <span className="text-xs text-[#64748b]">Bandeja de Entrada de Prueba</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0f172a]">
            Simulador Interactivo de Phishing Universitario
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl">
            Inspecciona cabeceras SPF/DKIM, analiza dominios remitentes y detecta trampas de ingeniería social dirigidas a alumnos y profesores.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#f8fafc] border border-slate-200 px-4 py-2.5 rounded-xl shrink-0">
          <Sparkles className="w-4 h-4 text-[#2563eb]" />
          <span className="text-xs font-semibold text-[#0f172a]">
            Progreso: {solvedEmails.length} de {PHISHING_EMAILS_DATA.length} analizados
          </span>
        </div>
      </div>

      {/* Main Mailbox Interface (Left sidebar 4 cols, Right Email Body 8 cols) */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Mailbox Nav & Email List (4 cols) */}
        <div className="lg:col-span-4 border-r border-[#e2e8f0] flex flex-col bg-[#f8fafc]">
          <div className="p-4 border-b border-[#e2e8f0] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs text-[#0f172a]">
              <Inbox className="w-4 h-4 text-[#2563eb]" />
              <span>Bandeja Institucional (@universidad.edu)</span>
            </div>
            <span className="text-xs bg-slate-100 font-mono text-slate-600 px-2 py-0.5 rounded">
              {PHISHING_EMAILS_DATA.length} mensajes
            </span>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {PHISHING_EMAILS_DATA.map((email) => {
              const isSelected = email.id === currentEmail.id;
              const isSolved = solvedEmails.includes(email.id);

              return (
                <div
                  key={email.id}
                  onClick={() => handleSelectEmail(email)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected ? 'bg-white border-l-4 border-l-[#2563eb] shadow-sm' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#0f172a] truncate max-w-[170px]">
                      {email.senderName}
                    </span>
                    <span className="text-[11px] text-slate-400 shrink-0">{email.timestamp}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">
                    {email.subject}
                  </h3>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] font-mono bg-slate-200/60 text-slate-700 px-2 py-0.5 rounded">
                      {email.category}
                    </span>
                    {isSolved && (
                      <span className="text-[11px] text-[#059669] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Resuelto
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 border-t border-[#e2e8f0] bg-white text-[11px] text-slate-500 flex items-center justify-between">
            <span>Servidor: mail.campus-core.edu</span>
            <span className="font-mono text-[#059669]">TLS 1.3 OK</span>
          </div>
        </div>

        {/* Right Email Viewer & Forensic Tools (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 bg-white">
          <div className="space-y-6">
            {/* Email Meta Header */}
            <div className="border-b border-[#e2e8f0] pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h2 className="text-lg sm:text-xl font-bold text-[#0f172a]">
                  {currentEmail.subject}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowHeaders(!showHeaders)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>{showHeaders ? 'Ocultar Cabeceras' : 'Inspeccionar Cabeceras RFC'}</span>
                  </button>
                </div>
              </div>

              <div className="text-xs space-y-1 bg-[#f8fafc] p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-500 w-16">De:</span>
                  <span className="font-semibold text-[#0f172a]">{currentEmail.senderName}</span>
                  <span className="font-mono text-[#dc2626] font-semibold bg-red-50 px-1.5 rounded">
                    &lt;{currentEmail.senderAddress}&gt;
                  </span>
                </div>

                {currentEmail.replyToAddress && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-500 w-16">Reply-To:</span>
                    <span className="font-mono text-amber-700 bg-amber-50 px-1.5 rounded">
                      &lt;{currentEmail.replyToAddress}&gt;
                    </span>
                    <span className="text-[11px] text-red-600 font-semibold">(¡Dirección diferente!)</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-500 w-16">Fecha:</span>
                  <span className="text-slate-600">{currentEmail.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Expandable RFC 822 Headers Modal/Box */}
            {showHeaders && (
              <div className="p-4 rounded-xl bg-[#0f172a] text-[#e2e8f0] font-mono text-xs space-y-2 border border-slate-800 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2 text-[11px] text-slate-400">
                  <span>ANÁLISIS DE ENCABEZADOS DE CORREO (RFC 822 / 5322)</span>
                  <span className="text-[#10b981]">DNSSEC VERIFIED</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-slate-400 block text-[10px]">SPF:</span>
                    <span className={`font-bold ${currentEmail.headers.spf === 'PASS' ? 'text-[#10b981]' : 'text-[#dc2626]'}`}>
                      {currentEmail.headers.spf}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-slate-400 block text-[10px]">DKIM:</span>
                    <span className={`font-bold ${currentEmail.headers.dkim === 'PASS' ? 'text-[#10b981]' : 'text-[#dc2626]'}`}>
                      {currentEmail.headers.dkim}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded">
                    <span className="text-slate-400 block text-[10px]">DMARC:</span>
                    <span className={`font-bold ${currentEmail.headers.dmarc === 'PASS' ? 'text-[#10b981]' : 'text-[#dc2626]'}`}>
                      {currentEmail.headers.dmarc}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 pt-1 space-y-1">
                  <p><span className="text-slate-400">Return-Path:</span> {currentEmail.headers.returnPath}</p>
                  <p><span className="text-slate-400">Received-From:</span> {currentEmail.headers.receivedFromIp}</p>
                </div>
              </div>
            )}

            {/* Email Body Content */}
            <div 
              className="p-5 rounded-xl border border-slate-200 bg-white shadow-inner"
              dangerouslySetInnerHTML={{ __html: currentEmail.bodyHtml }}
            />

            {/* Forensic Checklist: Mark Suspicious Indicators */}
            <div className="bg-[#f8fafc] p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-[#2563eb]" />
                <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">
                  Banderas Rojas Detectadas por el Analista (Tú)
                </h4>
              </div>
              <p className="text-xs text-slate-500">
                Selecciona las anomalías que logres identificar en este mensaje:
              </p>

              <div className="space-y-1.5">
                {[
                  'El dominio del remitente no es el oficial institucional (@universidad.edu).',
                  'Falsa urgencia artificial (amenazas de suspensión de cuenta o pérdida de fondos).',
                  'Archivo adjunto peligroso o con doble extensión ejecutable (.pdf.exe / .vbs).',
                  'Hipervínculo que apunta a un servidor externo no autorizado o acortador.',
                  'Falla de autenticación en SPF o firma criptográfica DKIM ausente/inválida.'
                ].map((flagText, idx) => {
                  const isChecked = selectedFlags.includes(flagText);
                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer text-xs transition-colors ${
                        isChecked ? 'bg-[#eff6ff] text-[#1d4ed8] font-medium' : 'hover:bg-slate-200/50 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleFlag(flagText)}
                        disabled={verdictSubmitted}
                        className="rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb] mt-0.5"
                      />
                      <span>{flagText}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Verdict Submission Actions & Feedback */}
          <div className="mt-8 pt-6 border-t border-[#e2e8f0]">
            {!verdictSubmitted ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-[#0f172a]">¿Cuál es tu veredicto?</span> Evalúa si este mensaje es un ataque o un comunicado legítimo.
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleSubmitVerdict(true)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Reportar como Phishing</span>
                  </button>

                  <button
                    onClick={() => handleSubmitVerdict(false)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#10b981] hover:bg-[#059669] transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Validar como Legítimo</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Educational Feedback Banner */
              <div className="space-y-4">
                {userVerdictIsPhishing === currentEmail.isPhishing ? (
                  <div className="p-4 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46]">
                    <div className="flex items-center gap-2 font-bold text-sm mb-1">
                      <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                      <span>¡Veredicto Correcto! (+25 puntos defensivos)</span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed mb-3">
                      {currentEmail.explanation}
                    </p>
                    <div className="text-xs font-semibold text-[#047857]">
                      {currentEmail.isPhishing
                        ? 'Identificaste exitosamente el intento de suplantación.'
                        : 'Confirmaste acertadamente que es una comunicación ordinaria válida.'}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#fef2f2] border border-[#fecaca] text-[#991b1b]">
                    <div className="flex items-center gap-2 font-bold text-sm mb-1">
                      <AlertTriangle className="w-5 h-5 text-[#dc2626]" />
                      <span>Veredicto Equivocado. Atención a las señales:</span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed mb-3">
                      {currentEmail.explanation}
                    </p>
                    <div className="text-xs font-semibold">
                      {currentEmail.isPhishing
                        ? 'Este correo era un ataque peligroso. Al confiar en él habrías comprometido tus credenciales.'
                        : 'Este mensaje era una comunicación legítima del sistema de biblioteca.'}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleResetCurrentCase}
                    className="text-xs font-semibold text-[#2563eb] hover:underline flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reevaluar este caso</span>
                  </button>

                  <span className="text-xs text-slate-500 font-mono">
                    ID Caso: {currentEmail.id.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
