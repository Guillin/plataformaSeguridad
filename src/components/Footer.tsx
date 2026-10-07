import React from 'react';
import { ShieldCheck, Lock, ExternalLink, LifeBuoy } from 'lucide-react';
import { ViewTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-white border-t border-[#e2e8f0] py-10 text-xs text-[#64748b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#0f172a] block">CyberShield Edu</span>
              <span className="text-[11px] text-slate-500">
                Iniciativa de Seguridad y Concienciación Digital del Campus Universitario
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button onClick={() => onSelectTab('dashboard')} className="hover:text-[#2563eb] transition-colors">
              Vista General
            </button>
            <button onClick={() => onSelectTab('modules')} className="hover:text-[#2563eb] transition-colors">
              Módulos Formativos
            </button>
            <button onClick={() => onSelectTab('simulator')} className="hover:text-[#2563eb] transition-colors">
              Simulador Forense
            </button>
            <button onClick={() => onSelectTab('lab')} className="hover:text-[#2563eb] transition-colors">
              Consola CLI
            </button>
            <button onClick={() => onSelectTab('posture')} className="hover:text-[#2563eb] transition-colors">
              Certificado
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p>
            © {new Date().getFullYear()} CyberShield Edu. Conforme a directivas de protección de datos académicos y ciberseguridad institucional.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">Canal Seguro CSIRT: seguridad@universidad.edu</span>
            <span>·</span>
            <span className="text-[#059669] font-medium flex items-center gap-1">
              <Lock className="w-3 h-3" /> WPA3 / TLS 1.3
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
