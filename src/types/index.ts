export type ViewTab = 'dashboard' | 'modules' | 'simulator' | 'lab' | 'posture';

export interface ModuleLesson {
  id: string;
  title: string;
  category: 'Ingeniería Social' | 'Credenciales' | 'Redes' | 'Datos' | 'Amenazas' | 'Móvil';
  durationMinutes: number;
  description: string;
  realCampusScenario: string;
  learningPoints: string[];
  threatIndicators: string[];
  practicalTips: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface PhishingEmail {
  id: string;
  subject: string;
  senderName: string;
  senderAddress: string;
  replyToAddress?: string;
  timestamp: string;
  isPhishing: boolean;
  category: 'Beca' | 'Soporte IT' | 'Biblioteca' | 'Nómina Docente';
  bodyHtml: string;
  redFlags: string[];
  legitimateMarkers: string[];
  explanation: string;
  headers: {
    spf: 'PASS' | 'FAIL' | 'SOFTFAIL';
    dkim: 'PASS' | 'FAIL' | 'NONE';
    dmarc: 'PASS' | 'FAIL';
    returnPath: string;
    receivedFromIp: string;
  };
}

export interface SecurityChecklistItem {
  id: string;
  label: string;
  description: string;
  category: 'Cuenta' | 'Dispositivo' | 'Navegación' | 'Datos';
  completed: boolean;
  points: number;
}
