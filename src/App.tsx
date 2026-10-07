/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ViewTab, SecurityChecklistItem } from './types';
import { MODULES_DATA } from './data/modulesData';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { ModulesView } from './components/ModulesView';
import { PhishingSimulatorView } from './components/PhishingSimulatorView';
import { SecurityLabConsole } from './components/SecurityLabConsole';
import { PostureAndCertificateView } from './components/PostureAndCertificateView';
import { Footer } from './components/Footer';

const INITIAL_CHECKLIST: SecurityChecklistItem[] = [
  {
    id: 'chk-1',
    label: 'Autenticación en Dos Pasos (2FA) en correo @universidad.edu',
    description: 'Activada mediante app TOTP (Google o Microsoft Authenticator) para frenar accesos indebidos.',
    category: 'Cuenta',
    completed: true,
    points: 10,
  },
  {
    id: 'chk-2',
    label: 'Instalación Oficial de eduroam con Certificado 802.1X',
    description: 'Configurada a través del instalador oficial CAT para evitar puntos de acceso falsos.',
    category: 'Navegación',
    completed: true,
    points: 10,
  },
  {
    id: 'chk-3',
    label: 'Contraseña Robusta y No Reutilizada en Sistemas Académicos',
    description: 'Longitud mínima de 14 caracteres o frase de paso única generada con gestor de contraseñas.',
    category: 'Cuenta',
    completed: true,
    points: 10,
  },
  {
    id: 'chk-4',
    label: 'Cifrado de Disco Completo (BitLocker / FileVault)',
    description: 'Protege las tesis y bases de datos en la laptop ante robo físico o extravío.',
    category: 'Dispositivo',
    completed: false,
    points: 10,
  },
  {
    id: 'chk-5',
    label: 'Bloqueo Automático de Pantalla a los 2 minutos',
    description: 'Evita accesos no autorizados en bibliotecas, laboratorios o cafeterías.',
    category: 'Dispositivo',
    completed: true,
    points: 10,
  },
  {
    id: 'chk-6',
    label: 'Copias de Seguridad Periódicas (Regla 3-2-1)',
    description: 'Respaldo seguro en la nube institucional y copia externa desconectada contra ransomware.',
    category: 'Datos',
    completed: false,
    points: 10,
  },
  {
    id: 'chk-7',
    label: 'Permisos Restringidos en Enlaces Compartidos de Drive/OneDrive',
    description: 'Sin enlaces abiertos con opción "cualquiera en internet puede editar".',
    category: 'Datos',
    completed: true,
    points: 10,
  },
  {
    id: 'chk-8',
    label: 'Verificación de Enlaces e Inspección de Cabeceras al Recibir Emails',
    description: 'Práctica activa de comprobación del remitente real antes de ingresar cualquier clave.',
    category: 'Navegación',
    completed: true,
    points: 10,
  },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('dashboard');
  const [completedModules, setCompletedModules] = useState<string[]>([
    'phishing-academico',
    'higiene-credenciales-2fa',
  ]);
  const [solvedEmails, setSolvedEmails] = useState<string[]>(['email-1']);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<SecurityChecklistItem[]>(INITIAL_CHECKLIST);

  // Dynamic Defense Score Calculation (0 - 100)
  const defenseScore = useMemo(() => {
    // 40% from completed modules
    const modulesScore = (completedModules.length / MODULES_DATA.length) * 40;
    // 30% from phishing cases solved
    const phishingScore = Math.min(30, solvedEmails.length * 15);
    // 30% from checklist items
    const completedChecklistCount = checklist.filter((i) => i.completed).length;
    const checklistScore = (completedChecklistCount / checklist.length) * 30;

    return Math.min(100, Math.round(modulesScore + phishingScore + checklistScore));
  }, [completedModules, solvedEmails, checklist]);

  const handleToggleCompleteModule = (moduleId: string) => {
    if (completedModules.includes(moduleId)) {
      setCompletedModules(completedModules.filter((id) => id !== moduleId));
    } else {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const handleOpenModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setCurrentTab('modules');
  };

  const handleSolveCase = (emailId: string, success: boolean) => {
    if (success && !solvedEmails.includes(emailId)) {
      setSolvedEmails([...solvedEmails, emailId]);
    }
  };

  const handleToggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'modules') {
            setActiveModuleId(null);
          }
        }}
        defenseScore={defenseScore}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'dashboard' && (
          <DashboardView
            onSelectTab={setCurrentTab}
            defenseScore={defenseScore}
            completedModules={completedModules}
            solvedPhishingCount={solvedEmails.length}
            onOpenModule={handleOpenModule}
          />
        )}

        {currentTab === 'modules' && (
          <ModulesView
            completedModules={completedModules}
            onToggleCompleteModule={handleToggleCompleteModule}
            activeModuleId={activeModuleId}
            setActiveModuleId={setActiveModuleId}
          />
        )}

        {currentTab === 'simulator' && (
          <PhishingSimulatorView
            onSolveCase={handleSolveCase}
            solvedEmails={solvedEmails}
          />
        )}

        {currentTab === 'lab' && (
          <SecurityLabConsole defenseScore={defenseScore} />
        )}

        {currentTab === 'posture' && (
          <PostureAndCertificateView
            defenseScore={defenseScore}
            completedModulesCount={completedModules.length}
            totalModulesCount={MODULES_DATA.length}
            solvedPhishingCount={solvedEmails.length}
            checklist={checklist}
            onToggleChecklistItem={handleToggleChecklistItem}
          />
        )}
      </main>

      <Footer onSelectTab={setCurrentTab} />
    </div>
  );
}
