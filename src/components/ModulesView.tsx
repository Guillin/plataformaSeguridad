import React, { useState } from 'react';
import { MODULES_DATA } from '../data/modulesData';
import { ModuleLesson } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  AlertTriangle, 
  Lightbulb, 
  HelpCircle, 
  Check, 
  X, 
  BookOpen, 
  RotateCcw
} from 'lucide-react';

interface ModulesViewProps {
  completedModules: string[];
  onToggleCompleteModule: (moduleId: string) => void;
  activeModuleId: string | null;
  setActiveModuleId: (id: string | null) => void;
}

export const ModulesView: React.FC<ModulesViewProps> = ({
  completedModules,
  onToggleCompleteModule,
  activeModuleId,
  setActiveModuleId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const categories = ['Todas', 'Ingeniería Social', 'Credenciales', 'Redes', 'Datos', 'Amenazas', 'Móvil'];

  const filteredModules = selectedCategory === 'Todas'
    ? MODULES_DATA
    : MODULES_DATA.filter((m) => m.category === selectedCategory);

  const activeModule = MODULES_DATA.find((m) => m.id === activeModuleId);

  const handleSelectModule = (mod: ModuleLesson) => {
    setActiveModuleId(mod.id);
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const handleNextModule = () => {
    if (!activeModule) return;
    const currentIndex = MODULES_DATA.findIndex((m) => m.id === activeModule.id);
    if (currentIndex < MODULES_DATA.length - 1) {
      setActiveModuleId(MODULES_DATA[currentIndex + 1].id);
      setQuizAnswer(null);
      setQuizSubmitted(false);
    }
  };

  const handlePrevModule = () => {
    if (!activeModule) return;
    const currentIndex = MODULES_DATA.findIndex((m) => m.id === activeModule.id);
    if (currentIndex > 0) {
      setActiveModuleId(MODULES_DATA[currentIndex - 1].id);
      setQuizAnswer(null);
      setQuizSubmitted(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* If an active module is selected, display the Interactive Learning Sandbox */}
      {activeModule ? (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <button
              onClick={() => setActiveModuleId(null)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0f172a] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la lista de módulos</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-semibold text-[#2563eb] bg-[#eff6ff] px-2.5 py-1 rounded-full">
                {activeModule.category}
              </span>
              <span className="text-xs text-[#64748b] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {activeModule.durationMinutes} min
              </span>
              <button
                onClick={() => onToggleCompleteModule(activeModule.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors flex items-center gap-1.5 ${
                  completedModules.includes(activeModule.id)
                    ? 'bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {completedModules.includes(activeModule.id) ? 'Acreditado' : 'Marcar Acreditado'}
                </span>
              </button>
            </div>
          </div>

          {/* Module Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Module Title & Overview */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e2e8f0] shadow-sm">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-3">
                  {activeModule.title}
                </h1>
                <p className="text-base text-[#475569] leading-relaxed mb-6">
                  {activeModule.description}
                </p>

                {/* Real Campus Scenario Card */}
                <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-5 mb-6">
                  <div className="flex items-center gap-2 mb-2 text-[#1d4ed8]">
                    <AlertTriangle className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wider">
                      Escenario Real Ocurrido en Campus
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1e293b] leading-relaxed italic">
                    "{activeModule.realCampusScenario}"
                  </p>
                </div>

                {/* Key Learning Points */}
                <h3 className="text-base font-bold text-[#0f172a] mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#2563eb]" />
                  Objetivos de Aprendizaje Clave
                </h3>
                <ul className="space-y-2.5 mb-6">
                  {activeModule.learningPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]">
                      <span className="w-5 h-5 rounded-full bg-[#eff6ff] text-[#2563eb] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Practical Tips */}
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-base font-bold text-[#0f172a] mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    Buenas Prácticas Inmediatas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModule.practicalTips.map((tip, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs text-[#334155] flex items-start gap-2">
                        <span className="text-[#10b981] font-bold">✓</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Quiz Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e2e8f0] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#eff6ff] text-[#2563eb] flex items-center justify-center">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-[#0f172a]">
                      Comprobación Práctica del Módulo
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">1 Pregunta Evaluativa</span>
                </div>

                <p className="text-sm font-semibold text-[#0f172a] mb-4 leading-relaxed">
                  {activeModule.quiz.question}
                </p>

                <div className="space-y-2.5 mb-5">
                  {activeModule.quiz.options.map((option, idx) => {
                    const isSelected = quizAnswer === idx;
                    const isCorrect = idx === activeModule.quiz.correctIndex;
                    let optionStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'border-[#a7f3d0] bg-[#ecfdf5] text-[#059669] font-medium';
                      } else if (isSelected) {
                        optionStyle = 'border-[#fecaca] bg-[#fef2f2] text-[#dc2626]';
                      } else {
                        optionStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-[#2563eb] bg-[#eff6ff] text-[#1d4ed8] font-medium shadow-sm';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={quizSubmitted}
                        onClick={() => setQuizAnswer(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                      >
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-mono shrink-0 mt-0.5 ${
                          isSelected ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-slate-300 text-slate-500'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {quizSubmitted && isCorrect && (
                          <Check className="w-4 h-4 text-[#059669] shrink-0" />
                        )}
                        {quizSubmitted && isSelected && !isCorrect && (
                          <X className="w-4 h-4 text-[#dc2626] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    disabled={quizAnswer === null}
                    onClick={() => {
                      setQuizSubmitted(true);
                      if (quizAnswer === activeModule.quiz.correctIndex) {
                        if (!completedModules.includes(activeModule.id)) {
                          onToggleCompleteModule(activeModule.id);
                        }
                      }
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    Confirmar Respuesta
                  </button>
                ) : (
                  <div className="space-y-4 pt-2">
                    <div className={`p-4 rounded-xl border text-xs sm:text-sm ${
                      quizAnswer === activeModule.quiz.correctIndex
                        ? 'bg-[#ecfdf5] border-[#a7f3d0] text-[#065f46]'
                        : 'bg-[#fffbeb] border-[#fde68a] text-[#92400e]'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        {quizAnswer === activeModule.quiz.correctIndex ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                            <span>¡Excelente! Respuesta Correcta.</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span>Respuesta incorrecta. Revisa el análisis:</span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed">{activeModule.quiz.explanation}</p>
                    </div>

                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizAnswer(null);
                      }}
                      className="text-xs font-semibold text-[#2563eb] hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reintentar evaluación</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Threat Indicators & Navigation (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Threat Indicators Deck */}
              <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-[#dc2626]">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">
                    Señales de Alerta Críticas
                  </h3>
                </div>
                <p className="text-xs text-[#64748b] mb-4">
                  Indicadores de compromiso frecuentes en este tipo de incidentes universitarios:
                </p>
                <div className="space-y-2.5">
                  {activeModule.threatIndicators.map((ind, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#fef2f2] border border-[#fee2e2] text-xs text-[#991b1b] flex items-start gap-2">
                      <span className="font-bold font-mono">!</span>
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Navigation Footer */}
              <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm space-y-3">
                <span className="text-xs font-semibold text-[#64748b] block">Navegación del Curso</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handlePrevModule}
                    disabled={MODULES_DATA.findIndex((m) => m.id === activeModule.id) === 0}
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-700 flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Anterior
                  </button>
                  <button
                    onClick={handleNextModule}
                    disabled={MODULES_DATA.findIndex((m) => m.id === activeModule.id) === MODULES_DATA.length - 1}
                    className="p-2.5 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    Siguiente <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Modules Directory View */
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e2e8f0] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-2">
                  Plan Formativo en Ciberseguridad
                </h1>
                <p className="text-sm text-[#475569] max-w-2xl">
                  Lecciones estructuradas con simulaciones reales de ingeniería social, protocolos universitarios y blindaje digital de investigaciones.
                </p>
              </div>

              <div className="bg-[#eff6ff] px-4 py-3 rounded-xl border border-[#bfdbfe] text-xs font-semibold text-[#1d4ed8] flex items-center gap-2 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />
                <span>
                  {completedModules.length} de {MODULES_DATA.length} Acreditados
                </span>
              </div>
            </div>

            {/* Category Filter Pills (Functional Buttons) */}
            <div className="flex flex-wrap items-center gap-1.5 mt-6 pt-6 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-500 mr-2">Filtrar por:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#2563eb] text-white shadow-sm'
                      : 'bg-[#f1f5f9] text-[#475569] hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((mod) => {
              const isCompleted = completedModules.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  onClick={() => handleSelectModule(mod)}
                  className="bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#2563eb] hover:shadow-md transition-all cursor-pointer p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-semibold text-[#2563eb] bg-[#eff6ff] px-2.5 py-0.5 rounded-full">
                        {mod.category}
                      </span>
                      {isCompleted ? (
                        <span className="text-xs font-semibold text-[#059669] flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Aprobado
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {mod.durationMinutes} min
                        </span>
                      )}
                    </div>

                    <h2 className="text-base font-bold text-[#0f172a] group-hover:text-[#2563eb] transition-colors mb-2 leading-snug">
                      {mod.title}
                    </h2>

                    <p className="text-xs text-[#475569] line-clamp-3 leading-relaxed mb-4">
                      {mod.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#2563eb]">
                    <span>{isCompleted ? 'Repasar Lección' : 'Iniciar Módulo'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
