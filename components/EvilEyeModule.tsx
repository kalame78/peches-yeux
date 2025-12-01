import React, { useState } from 'react';
import { Eye, Shield, Zap, Droplets, CheckCircle, ArrowRight, Users } from 'lucide-react';

const EvilEyeModule: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "La Demande",
      desc: "Celui qui a lancé le mauvais œil demande à l'autre de se laver pour lui.",
      icon: <Users size={24} />
    },
    {
      title: "Le Visage & Mains",
      desc: "Il lave son visage, ses mains et ses coudes.",
      icon: <Droplets size={24} />
    },
    {
      title: "Les Genoux & Pieds",
      desc: "Il lave ses genoux et les extrémités de ses pieds.",
      icon: <ArrowRight size={24} />
    },
    {
      title: "L'Intérieur",
      desc: "Il lave l'intérieur de son pagne (parties intimes couvertes) dans le récipient.",
      icon: <Shield size={24} />
    },
    {
      title: "Le Déversement",
      desc: "On verse toute l'eau du récipient sur la tête et le dos du malade d'un seul coup.",
      icon: <Zap size={24} />
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Cards Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-yellow-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
              <Eye size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Le Mauvais Œil (Al-Ayn)</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Le regard admiratif avec jalousie qu'une personne émet envers une autre, provoquant un dommage à la personne regardée.
          </p>
          <div className="bg-yellow-50 p-3 rounded-lg text-yellow-800 text-xs italic">
            "Le mauvais œil est une vérité." — Prophète (ﷺ)
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-3 rounded-full text-red-600">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Le Danger & La Cause</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Allah crée la causalité entre le regard et le tort subi. C'est quelque chose qui sort des yeux de l'envieux comme une flèche. Si elle touche, elle cause du tort (maladie, changement d'état...).
          </p>
           <div className="bg-red-50 p-3 rounded-lg text-red-800 text-xs italic">
            "Ne vas-tu pas souhaiter pour lui la bénédiction (Baraka) ?"
          </div>
        </div>
      </div>

      {/* Interactive Remedy Stepper */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-900 p-6 text-white">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="text-indigo-300" />
            Le Remède : Le Lavage (Ghusl)
          </h3>
          <p className="text-indigo-200 text-sm mt-2">
            La méthode décrite par le Prophète (ﷺ) pour guérir du mauvais œil si l'auteur est connu.
          </p>
        </div>
        
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex-1 group relative p-4 rounded-xl border-2 transition-all text-left
                  ${activeStep === idx 
                    ? 'border-indigo-600 bg-indigo-50 shadow-md' 
                    : 'border-gray-100 hover:border-indigo-200 bg-white'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${activeStep === idx ? 'text-indigo-600' : 'text-gray-400'}`}>
                    Étape {idx + 1}
                  </span>
                  {activeStep > idx ? <CheckCircle size={16} className="text-green-500" /> : null}
                </div>
                <div className={`font-semibold ${activeStep === idx ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.title}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-indigo-50 rounded-2xl p-8 flex items-start gap-6 animate-fade-in transition-all">
            <div className="bg-white p-4 rounded-full shadow-md text-indigo-600 hidden md:block">
              {steps[activeStep].icon}
            </div>
            <div>
              <h4 className="text-xl font-bold text-indigo-900 mb-2">
                {activeStep + 1}. {steps[activeStep].title}
              </h4>
              <p className="text-indigo-800 text-lg leading-relaxed">
                {steps[activeStep].desc}
              </p>
              {activeStep === 4 && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm font-medium border border-green-200">
                  Résultat : Avec la permission d'Allah, le malade guérit.
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
            <button 
              disabled={activeStep === 0}
              onClick={() => setActiveStep(prev => prev - 1)}
              className="hover:text-indigo-600 disabled:opacity-30 px-4 py-2"
            >
              ← Précédent
            </button>
            <span className="font-mono">{activeStep + 1} / {steps.length}</span>
             <button 
              disabled={activeStep === steps.length - 1}
              onClick={() => setActiveStep(prev => prev + 1)}
              className="hover:text-indigo-600 disabled:opacity-30 px-4 py-2"
            >
              Suivant →
            </button>
          </div>
        </div>
      </div>
      
      {/* Prevention Tip */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white flex items-center justify-between shadow-lg transform hover:scale-[1.01] transition-transform cursor-pointer" onClick={() => alert("Baraka Allahu Fik !")}>
        <div>
          <h4 className="font-bold text-lg mb-1">Comment éviter de nuire ?</h4>
          <p className="text-emerald-100">Si tu vois quelque chose qui te plaît, invoque la bénédiction !</p>
        </div>
        <div className="bg-white/20 px-6 py-3 rounded-lg font-bold text-center backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors">
          <span className="block text-xs uppercase opacity-75">Dire</span>
          Allahumma Barik
        </div>
      </div>
    </div>
  );
};

export default EvilEyeModule;