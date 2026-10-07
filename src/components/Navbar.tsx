import React from 'react';
import { ViewTab } from '../types';
import { ShieldCheck, Terminal, MailWarning, Award, BookOpen, AlertCircle } from 'lucide-react';

interface NavbarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  defenseScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, defenseScore }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand title, one line */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[#2563eb] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-[#0f172a] block leading-none">
                CyberShield <span className="text-[#2563eb]">Edu</span>
              </span>
              <span className="text-[11px] text-[#64748b] font-medium hidden sm:block">
                Seguridad Digital Universitaria
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'dashboard'
                ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                : 'text-[#475569] hover:text-[#0f172a] hover:bg-slate-50'
            }`}
          >
            Vista General
          </button>

          <button
            onClick={() => onSelectTab('modules')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'modules'
                ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                : 'text-[#475569] hover:text-[#0f172a] hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Módulos
          </button>

          <button
            onClick={() => onSelectTab('simulator')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'simulator'
                ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                : 'text-[#475569] hover:text-[#0f172a] hover:bg-slate-50'
            }`}
          >
            <MailWarning className="w-4 h-4" />
            Simulador Phishing
          </button>

          <button
            onClick={() => onSelectTab('lab')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'lab'
                ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                : 'text-[#475569] hover:text-[#0f172a] hover:bg-slate-50'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Laboratorio CLI
          </button>

          <button
            onClick={() => onSelectTab('posture')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'posture'
                ? 'bg-[#eff6ff] text-[#2563eb] font-semibold'
                : 'text-[#475569] hover:text-[#0f172a] hover:bg-slate-50'
            }`}
          >
            <Award className="w-4 h-4" />
            Postura & Certificado
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] px-3 py-1.5 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></div>
            <span className="text-xs text-[#64748b] font-medium">Defensa:</span>
            <span className="text-xs font-bold text-[#0f172a] tabular-nums">{defenseScore}%</span>
          </div>

          <button
            onClick={() => onSelectTab('simulator')}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-xl transition-colors shadow-sm whitespace-nowrap flex items-center gap-1.5"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Reto de Phishing</span>
          </button>
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#e2e8f0] px-2 py-2 bg-white text-xs">
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`py-1 px-2 rounded-md ${currentTab === 'dashboard' ? 'text-[#2563eb] font-bold' : 'text-[#64748b]'}`}
        >
          Inicio
        </button>
        <button
          onClick={() => onSelectTab('modules')}
          className={`py-1 px-2 rounded-md ${currentTab === 'modules' ? 'text-[#2563eb] font-bold' : 'text-[#64748b]'}`}
        >
          Módulos
        </button>
        <button
          onClick={() => onSelectTab('simulator')}
          className={`py-1 px-2 rounded-md ${currentTab === 'simulator' ? 'text-[#2563eb] font-bold' : 'text-[#64748b]'}`}
        >
          Simulador
        </button>
        <button
          onClick={() => onSelectTab('lab')}
          className={`py-1 px-2 rounded-md ${currentTab === 'lab' ? 'text-[#2563eb] font-bold' : 'text-[#64748b]'}`}
        >
          Terminal
        </button>
        <button
          onClick={() => onSelectTab('posture')}
          className={`py-1 px-2 rounded-md ${currentTab === 'posture' ? 'text-[#2563eb] font-bold' : 'text-[#64748b]'}`}
        >
          Certificado
        </button>
      </div>
    </header>
  );
};
