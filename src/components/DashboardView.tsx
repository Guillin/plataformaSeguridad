import React, { useState } from 'react';
import { ViewTab } from '../types';
import { MODULES_DATA } from '../data/modulesData';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Terminal, 
  MailWarning, 
  KeyRound, 
  Wifi, 
  FileCheck, 
  ArrowRight,
  TrendingUp,
  Radio,
  Lock
} from 'lucide-react';

interface DashboardViewProps {
  onSelectTab: (tab: ViewTab) => void;
  defenseScore: number;
  completedModules: string[];
  solvedPhishingCount: number;
  onOpenModule: (moduleId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectTab,
  defenseScore,
  completedModules,
  solvedPhishingCount,
  onOpenModule,
}) => {
  const [testPassword, setTestPassword] = useState('');
  const [heroImageLoaded, setHeroImageLoaded] = useState(true);

  // Simple entropy / strength calculation
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Sin ingresar', color: 'bg-slate-200', text: 'text-slate-500' };
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (pass.length >= 12) score += 25;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 20;
    if (/[0-9]/.test(pass)) score += 15;
    if (/[^A-Za-z0-9]/.test(pass)) score += 15;

    if (score < 40) return { score, label: 'Vulnerable (crackeable en segundos)', color: 'bg-[#dc2626]', text: 'text-[#dc2626]' };
    if (score < 70) return { score, label: 'Moderada (vulnerable a fuerza bruta)', color: 'bg-amber-500', text: 'text-amber-600' };
    return { score, label: 'Excelente (resistente a ataques de diccionario)', color: 'bg-[#10b981]', text: 'text-[#059669]' };
  };

  const strength = calculatePasswordStrength(testPassword);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Text Zone */}
          <div className="lg:col-span-7 p-6 sm:p-10 z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2563eb] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
              <span>Protección Digital Universitaria</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Actualizado para el Ciclo Académico</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight mb-4">
              Defiende tu identidad académica contra ciberamenazas.
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-6 max-w-xl">
              Entrena con simulaciones reales de phishing institucional, asegura tus investigaciones y domina las herramientas defensivas que todo estudiante y docente necesita.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTab('simulator')}
                className="px-5 py-3 text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <MailWarning className="w-4 h-4" />
                <span>Simulador de Phishing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectTab('modules')}
                className="px-5 py-3 text-sm font-semibold text-[#0f172a] bg-white hover:bg-slate-50 border border-[#e2e8f0] rounded-xl transition-all flex items-center gap-2"
              >
                <span>Ver Plan de Módulos ({completedModules.length}/{MODULES_DATA.length})</span>
              </button>
            </div>
          </div>

          {/* Right Visual Image Zone */}
          <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden bg-slate-900">
            {heroImageLoaded ? (
              <img
                src="/src/assets/images/hero_cyber_campus_1791406078255.jpg"
                alt="Centro de Ciberseguridad Universitaria"
                className="w-full h-full object-cover object-center opacity-90 transition-opacity"
                onError={() => setHeroImageLoaded(false)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-6">
                <ShieldCheck className="w-16 h-16 text-[#2563eb] mb-2" />
                <span className="font-semibold text-lg">Centro de Operaciones de Seguridad</span>
                <span className="text-xs text-slate-400 mt-1">Monitoreo de Red Universitaria</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-white/20 to-transparent lg:w-32"></div>
            
            {/* Overlay Telemetry Badge */}
            <div className="absolute bottom-4 right-4 bg-[#0f172a]/90 backdrop-blur-md text-white p-3.5 rounded-xl border border-slate-700/60 shadow-lg text-xs">
              <div className="flex items-center gap-2 mb-1">
                <Radio className="w-3.5 h-3.5 text-[#10b981] animate-pulse" />
                <span className="font-semibold">Red Universitaria Protegida</span>
              </div>
              <span className="text-slate-300 font-mono text-[11px]">Firewall Activo · WPA3 eduroam</span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row (4 Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#64748b] block mb-1">Puntuación Defensiva</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0f172a] tabular-nums">{defenseScore}%</span>
              <span className="text-xs font-medium text-[#059669] flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> Nivel Seguro
              </span>
            </div>
            <div className="w-32 bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div 
                className="bg-[#2563eb] h-full rounded-full transition-all duration-500" 
                style={{ width: `${defenseScore}%` }}
              ></div>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#64748b] block mb-1">Módulos Acreditados</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0f172a] tabular-nums">
                {completedModules.length} / {MODULES_DATA.length}
              </span>
              <span className="text-xs font-medium text-slate-500">completados</span>
            </div>
            <span className="text-xs text-[#2563eb] font-medium block mt-1">
              {MODULES_DATA.length - completedModules.length === 0 ? '¡Plan finalizado!' : `${MODULES_DATA.length - completedModules.length} pendientes`}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#ecfdf5] text-[#059669] flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#64748b] block mb-1">Simulaciones Neutralizadas</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0f172a] tabular-nums">{solvedPhishingCount}</span>
              <span className="text-xs font-medium text-slate-500">casos resueltos</span>
            </div>
            <span className="text-xs text-[#059669] font-medium block mt-1">100% efectividad de detección</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center">
            <MailWarning className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#64748b] block mb-1">Certificación Digital</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-[#0f172a]">
                {completedModules.length >= 4 ? 'Apta para Emisión' : 'En Progreso'}
              </span>
            </div>
            <button
              onClick={() => onSelectTab('posture')}
              className="text-xs text-[#2563eb] hover:underline font-semibold block mt-1"
            >
              Ver credencial oficial →
            </button>
          </div>
          <div className="w-11 h-11 rounded-xl bg-slate-100 text-[#0f172a] flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Main Grid: Campus Threat Radar (8 cols) & Interactive Quick Security Tool (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Campus Threat Radar & Recommended Curriculum */}
        <div className="lg:col-span-8 space-y-6">
          {/* Campus Threat Radar Box */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0f172a]">Radar de Amenazas del Campus</h2>
                  <span className="text-xs text-[#64748b]">Incidentes activos reportados por el CSIRT Universitario</span>
                </div>
              </div>
              <span className="text-xs font-medium bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0] px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span> Monitoreo en Vivo
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-slate-300 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-[#dc2626] bg-[#fef2f2] px-2 py-0.5 rounded">
                        ALTO RIESGO
                      </span>
                      <h3 className="text-sm font-bold text-[#0f172a]">
                        Campaña de Phishing: "Actualización Urgente de Buzón Institucional"
                      </h3>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Se han detectado correos masivos provenientes de dominios clonados solicitando ingresar usuario y clave para evitar corte de almacenamiento.
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectTab('simulator')}
                    className="text-xs font-semibold text-[#2563eb] hover:bg-[#eff6ff] px-2.5 py-1.5 rounded-lg border border-[#dbeafe] transition-colors whitespace-nowrap shrink-0"
                  >
                    Examinar en Simulador
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-slate-300 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        PREVENCIÓN
                      </span>
                      <h3 className="text-sm font-bold text-[#0f172a]">
                        Puntos de Acceso Wi-Fi Falsos (Evil Twin) en Biblioteca y Cafetería
                      </h3>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Aparecieron redes abiertas sin contraseña con nombres como "WiFi_Estudiantes_Gratis". No te conectes: usa exclusivamente <strong>eduroam</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenModule('redes-eduroam-vpn')}
                    className="text-xs font-semibold text-[#2563eb] hover:bg-[#eff6ff] px-2.5 py-1.5 rounded-lg border border-[#dbeafe] transition-colors whitespace-nowrap shrink-0"
                  >
                    Ver Guía eduroam
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Modules Quick Grid */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-[#0f172a]">Módulos de Formación Esenciales</h2>
                <span className="text-xs text-[#64748b]">Lecciones prácticas diseñadas para la vida académica</span>
              </div>
              <button
                onClick={() => onSelectTab('modules')}
                className="text-xs font-semibold text-[#2563eb] hover:underline flex items-center gap-1"
              >
                <span>Ver todos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MODULES_DATA.slice(0, 4).map((mod) => {
                const isCompleted = completedModules.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => onOpenModule(mod.id)}
                    className="p-4 rounded-xl border border-[#e2e8f0] hover:border-[#2563eb] hover:shadow-sm transition-all cursor-pointer bg-white group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold text-[#2563eb] bg-[#eff6ff] px-2 py-0.5 rounded-full font-mono">
                          {mod.category}
                        </span>
                        {isCompleted ? (
                          <span className="text-[11px] font-semibold text-[#059669] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Aprobado
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">{mod.durationMinutes} min</span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-[#0f172a] group-hover:text-[#2563eb] transition-colors line-clamp-1 mb-1">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-[#64748b] line-clamp-2 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#2563eb]">
                      <span>{isCompleted ? 'Repasar Lección' : 'Comenzar Módulo'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Interactive Tools Deck */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Tool: Password Entropy Tester */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#2563eb] flex items-center justify-center">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0f172a]">Probador de Contraseñas</h3>
                <span className="text-[11px] text-[#64748b]">Cálculo local y privado de entropía</span>
              </div>
            </div>

            <p className="text-xs text-[#475569] mb-3">
              Ingresa una contraseña hipotética para verificar su resistencia ante ataques de fuerza bruta en el campus.
            </p>

            <div className="space-y-2 mb-3">
              <div className="relative">
                <input
                  type="text"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="Ej: Tr4fico-C0mpus#2026!"
                  className="w-full text-xs font-mono px-3 py-2.5 rounded-xl border border-[#cbd5e1] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 text-[#0f172a] bg-white placeholder:text-slate-400"
                />
              </div>

              {testPassword && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-medium text-slate-600">Nivel de Fortaleza:</span>
                    <span className={`font-bold ${strength.text}`}>{strength.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strength.color} transition-all duration-300`} 
                      style={{ width: `${strength.score}%` }}
                    ></div>
                  </div>
                  <p className={`text-[11px] font-medium ${strength.text}`}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-slate-100 text-[11px] text-slate-500">
              💡 <strong>Regla de oro:</strong> Una frase de 4 palabras en español (ej. <span className="font-mono text-slate-700">guitarra-alondra-reloj-azul</span>) supera los 60 bits de entropía y es fácil de recordar.
            </div>
          </div>

          {/* Quick Tool: Security Lab CLI Promo */}
          <div className="bg-[#0f172a] text-white rounded-2xl p-6 border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#2563eb] text-white flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Laboratorio de Comandos CLI</h3>
                <span className="text-[11px] text-slate-400">Herramientas defensivas en consola</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Ejecuta inspecciones interactivas de SPF/DKIM, verifica hashes de instaladores y detecta redes clonadas desde la terminal institucional.
            </p>

            <div className="font-mono text-[11px] bg-black/50 p-2.5 rounded-lg text-slate-300 mb-4 border border-slate-800">
              <span className="text-[#10b981]">$</span> inspect-email --id 1<br/>
              <span className="text-slate-400">SPF: SOFTFAIL | DKIM: NONE</span>
            </div>

            <button
              onClick={() => onSelectTab('lab')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Abrir Terminal de Seguridad</span>
            </button>
          </div>

          {/* Quick CSIRT Contact Card */}
          <div className="bg-[#eff6ff] rounded-2xl border border-[#dbeafe] p-5">
            <div className="flex items-center gap-2 mb-2 text-[#2563eb]">
              <Lock className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Línea de Emergencia CSIRT</h4>
            </div>
            <p className="text-xs text-[#334155] leading-relaxed mb-3">
              ¿Sospechas que tu cuenta institucional ha sido comprometida o detectaste una brecha en un laboratorio?
            </p>
            <div className="space-y-1 font-mono text-xs text-[#0f172a]">
              <p>Email: <span className="font-semibold text-[#2563eb]">seguridad@universidad.edu</span></p>
              <p>Anexo interno: <span className="font-semibold">Ext. 4400 / 4401</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
