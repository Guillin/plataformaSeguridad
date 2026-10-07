import React, { useState } from 'react';
import { SecurityChecklistItem } from '../types';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Printer, 
  Download, 
  ExternalLink, 
  User, 
  Calendar, 
  Key, 
  Lock, 
  Check, 
  Sparkles,
  Share2
} from 'lucide-react';

interface PostureAndCertificateViewProps {
  defenseScore: number;
  completedModulesCount: number;
  totalModulesCount: number;
  solvedPhishingCount: number;
  checklist: SecurityChecklistItem[];
  onToggleChecklistItem: (id: string) => void;
}

export const PostureAndCertificateView: React.FC<PostureAndCertificateViewProps> = ({
  defenseScore,
  completedModulesCount,
  totalModulesCount,
  solvedPhishingCount,
  checklist,
  onToggleChecklistItem,
}) => {
  const [userName, setUserName] = useState('Estudiante / Investigador(a)');
  const [isEditingName, setIsEditingName] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [badgeImageLoaded, setBadgeImageLoaded] = useState(true);

  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const certificateId = 'CS-EDU-2026-9812A';

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(
      `https://universidad.edu/certificaciones/verificar?id=${certificateId}&user=${encodeURIComponent(userName)}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isEligible = defenseScore >= 60 || completedModulesCount >= 3;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#2563eb] bg-[#eff6ff] px-2.5 py-0.5 rounded-full font-mono">
              POSTURA DEFENSIVA
            </span>
            <span className="text-xs text-[#64748b]">Acreditación Oficial de Competencias</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0f172a]">
            Mi Postura de Seguridad & Certificado Digital
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl">
            Comprueba tu nivel de blindaje cibernético, completa la lista de verificación defensiva y emite tu certificado acreditado.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-[#64748b] block">Nivel Global</span>
            <span className="text-xl font-bold text-[#0f172a] tabular-nums">{defenseScore}%</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#ecfdf5] text-[#059669] flex items-center justify-center font-bold">
            <ShieldCheck className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Grid: Interactive Checklist (6 cols) & Digital Certificate (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (6 cols): Defensive Checklist */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-[#0f172a]">
                  Lista de Verificación de Higiene Digital
                </h2>
                <p className="text-xs text-[#64748b]">
                  Marca las defensas que ya tienes activas en tus dispositivos personales y cuentas del campus:
                </p>
              </div>
              <span className="text-xs font-bold text-[#2563eb] bg-[#eff6ff] px-2.5 py-1 rounded-full">
                {checklist.filter((i) => i.completed).length} de {checklist.length} Activas
              </span>
            </div>

            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onToggleChecklistItem(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    item.completed
                      ? 'bg-[#f0fdf4] border-[#bbf7d0]'
                      : 'bg-white border-[#e2e8f0] hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      item.completed
                        ? 'bg-[#10b981] border-[#10b981] text-white'
                        : 'border-[#cbd5e1] bg-white'
                    }`}
                  >
                    {item.completed && <Check className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`text-xs font-bold ${
                          item.completed ? 'text-[#065f46]' : 'text-[#0f172a]'
                        }`}
                      >
                        {item.label}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                        +{item.points} pts
                      </span>
                    </div>
                    <p className="text-[11px] text-[#475569] mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-[#eff6ff] border border-[#dbeafe] text-xs text-[#1e40af] flex items-center justify-between">
              <span>Impacto: Cada casilla eleva tu puntuación institucional.</span>
              <span className="font-bold">+{checklist.filter((i) => i.completed).length * 5} pts sumados</span>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Official Printable Digital Certificate */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#2563eb]" />
                <h2 className="text-base font-bold text-[#0f172a]">Certificado Oficial Emitible</h2>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  isEligible
                    ? 'bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                {isEligible ? 'Listo para Emisión' : 'Requiere 60% de avance'}
              </span>
            </div>

            {/* Certificate Canvas / Card (Printable) */}
            <div
              id="printable-certificate"
              className="relative p-6 sm:p-8 rounded-2xl border-4 border-double border-[#cbd5e1] bg-gradient-to-b from-[#f8fafc] to-white text-center shadow-md overflow-hidden"
            >
              {/* Subtle watermarks and corner ornaments */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-400">
                CAMPUS DEFENSE INITIATIVE
              </div>
              <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-400">
                VERIFIED REGISTRY
              </div>

              {/* Badge Crest */}
              <div className="w-20 h-20 mx-auto mb-4 relative">
                {badgeImageLoaded ? (
                  <img
                    src="/src/assets/images/badge_cyber_shield_1791406098625.jpg"
                    alt="Escudo de Certificación"
                    className="w-full h-full object-contain drop-shadow-md rounded-full"
                    onError={() => setBadgeImageLoaded(false)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                )}
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-[#2563eb] block mb-1">
                Certificado de Competencia Defensiva
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight mb-2">
                Defensor Digital Universitario
              </h3>

              <p className="text-xs text-[#64748b] mb-4">
                Se otorga el presente reconocimiento formal a:
              </p>

              {/* Editable Name Field */}
              <div className="mb-4 inline-block max-w-sm w-full">
                {isEditingName ? (
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                    autoFocus
                    className="w-full text-center font-bold text-base sm:text-lg text-[#0f172a] border-b-2 border-[#2563eb] focus:outline-none bg-transparent"
                  />
                ) : (
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="group flex items-center justify-center gap-1.5 mx-auto font-bold text-base sm:text-lg text-[#0f172a] hover:text-[#2563eb] transition-colors border-b border-dashed border-slate-300 pb-0.5"
                    title="Haz clic para personalizar tu nombre"
                  >
                    <span>{userName}</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-[#2563eb]">✏️</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-[#475569] leading-relaxed max-w-md mx-auto mb-6">
                Por haber superado satisfactoriamente los módulos de detección forense de phishing, protección de datos de investigación, higiene de credenciales y navegación segura en redes del campus.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4 text-left text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">FECHA DE EMISIÓN:</span>
                  <span className="font-semibold text-slate-800">{currentDate}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">HASH DE REGISTRO:</span>
                  <span className="font-mono font-semibold text-slate-800">{certificateId}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="text-[#059669] flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> FIRMA CRIPTOGRÁFICA VÁLIDA
                </span>
                <span>PUNTAJE: {defenseScore}%</span>
              </div>
            </div>

            {/* Actions: Print and Share */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handlePrintCertificate}
                disabled={!isEligible}
                className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Descargar PDF</span>
              </button>

              <button
                onClick={handleCopyShareLink}
                className="py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-[#0f172a] bg-white border border-[#e2e8f0] hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <Share2 className="w-4 h-4 text-[#2563eb]" />
                <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
