
import React, { useState } from 'react';
import { User, Users, Eye, Info, BookOpen, AlertTriangle } from 'lucide-react';
import { Gender, Relation } from '../types';

// Zones du corps pour la coloration SVG
type BodyZone = 'head' | 'torso' | 'arms' | 'hands' | 'awrah_major' | 'legs' | 'feet';

const AwrahSimulator: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<Gender>(Gender.Male);
  const [relation, setRelation] = useState<Relation>(Relation.Ajnabi);

  // --- LOGIQUE STRICTE BASÉE SUR LA FICHE 8 ---
  const getFicheContent = () => {
    // HOMME (Colonne 1 du PDF)
    if (selectedGender === Gender.Male) {
      if (relation === Relation.Mahram || relation === Relation.SameGender) {
        return {
          title: "L'Homme face à un Homme ou une Femme Mahram",
          awrahText: "Ce qu'il y a entre le nombril et les genoux.",
          source: "Hadith de Jarhad : « La cuisse est une 'awrah ».",
          colorZones: {
            red: ['awrah_major'],
            green: ['head', 'torso', 'arms', 'hands', 'legs', 'feet']
          },
          warning: null
        };
      } else if (relation === Relation.Ajnabi) {
        return {
          title: "L'Homme face à une Femme Ajnabiyyah (Étrangère)",
          awrahText: "Tout sauf la tête et les extrémités des membres.",
          source: "Khalil - al-Mukhtasar : « Et une femme ajnabiyyah (voit de lui) tout sauf le visage et les extrémités ».",
          colorZones: {
            red: ['awrah_major', 'torso', 'arms', 'legs'], // Le PDF est strict ici (Khalil)
            green: ['head', 'hands', 'feet']
          },
          warning: "Attention : Cette règle concerne ce que la femme étrangère peut voir de l'homme. Le regard doit être baissé par pudeur."
        };
      } else if (relation === Relation.Spouse) {
        return {
          title: "L'Homme avec son Épouse",
          awrahText: "Aucune restriction.",
          source: "Le mariage rend licite le regard sur tout le corps.",
          colorZones: {
            red: [],
            green: ['head', 'torso', 'arms', 'hands', 'awrah_major', 'legs', 'feet']
          },
          warning: null
        };
      }
    } 
    // FEMME (Colonne 2 du PDF)
    else {
      if (relation === Relation.SameGender) {
        return {
          title: "La Femme face à une Femme",
          awrahText: "Ce qu'il y a entre le nombril et les genoux.",
          source: "Analogie avec l'awrah de l'homme.",
          colorZones: {
            red: ['awrah_major'],
            green: ['head', 'torso', 'arms', 'hands', 'legs', 'feet']
          },
          warning: "Note : Les femmes non-musulmanes ne doivent pas décrire la femme aux hommes."
        };
      } else if (relation === Relation.Mahram) {
        return {
          title: "La Femme face à un Mahram (Père, Frère...)",
          awrahText: "Tout sauf la tête et les extrémités des membres.",
          source: "Khalil : « Le mahram est celui qu'elle ne possède un lien du sang... à jamais ».",
          colorZones: {
            red: ['awrah_major', 'torso', 'arms', 'legs'], // Torse/Dos/Ventre cachés
            green: ['head', 'hands', 'feet', 'arms'] // Bras/Cou tolérés selon contexte, mais on suit le texte "extrémités"
          },
          // Correction pour matcher "extrémités des membres" : souvent avant-bras/pieds/tête inclus.
          // Pour la visualisation stricte PDF : Tête (ok), Extrémités (mains/pieds). Le reste (torse/cuisse) rouge.
          warning: "Définition Mahram : Ceux interdits au mariage à jamais (Père, Fils, Frère, Oncle, Beau-père...)."
        };
      } else if (relation === Relation.Ajnabi) {
        return {
          title: "La Femme face à un Homme Ajnabi (Étranger)",
          awrahText: "Tout le corps est 'awrah (sauf visage/mains selon avis).",
          source: "Sourate An-Nur v.31 : « ... et de ne montrer de leurs atours que ce qui en paraît... »",
          colorZones: {
            red: ['head', 'torso', 'arms', 'awrah_major', 'legs', 'feet'], // Tout rouge par précaution base
            green: ['hands', 'head'] // Visage souvent toléré mais on met une note. Mettons Visage vert pour le schéma avec note.
            // Note: Sur le schéma PDF "Face à un homme ajnabi", c'est une silhouette très couverte.
          },
          warning: "ATTENTION : Les cousins, les fils de l'oncle, le beau-frère sont des ÉTRANGERS (Ajnabi). Il n'est pas permis de se dévoiler devant eux."
        };
      } else if (relation === Relation.Spouse) {
        return {
          title: "La Femme avec son Époux",
          awrahText: "Aucune restriction.",
          source: null,
          colorZones: {
            red: [],
            green: ['head', 'torso', 'arms', 'hands', 'awrah_major', 'legs', 'feet']
          },
          warning: null
        };
      }
    }
    return null;
  };

  const content = getFicheContent();

  return (
    <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
      {/* --- COLONNE GAUCHE : CONTRÔLES --- */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* 1. Identité */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User size={20} className="text-emerald-600" />
            1. Je suis :
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedGender(Gender.Male)}
              className={`flex-1 py-3 px-4 rounded-xl transition-all font-medium border-2 flex flex-col items-center gap-1 ${
                selectedGender === Gender.Male
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">👨</span>
              Homme
            </button>
            <button
              onClick={() => setSelectedGender(Gender.Female)}
              className={`flex-1 py-3 px-4 rounded-xl transition-all font-medium border-2 flex flex-col items-center gap-1 ${
                selectedGender === Gender.Female
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">🧕</span>
              Femme
            </button>
          </div>
        </div>

        {/* 2. Situation */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Eye size={20} className="text-emerald-600" />
            2. Qui est en face ?
          </h3>
          <div className="space-y-2">
            {(selectedGender === Gender.Male 
              ? [Relation.Ajnabi, Relation.Mahram, Relation.Spouse]
              : [Relation.Ajnabi, Relation.Mahram, Relation.SameGender, Relation.Spouse]
            ).map((r) => (
              <button
                key={r}
                onClick={() => setRelation(r)}
                className={`w-full text-left py-4 px-5 rounded-xl transition-all text-sm font-medium border flex justify-between items-center ${
                  relation === r
                    ? 'border-emerald-500 bg-emerald-600 text-white shadow-md'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {r}
                {relation === r && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Légende */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex gap-4 text-xs font-medium justify-center">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-400 rounded"></div> Autorisé
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 rounded"></div> Awrah (Interdit)
            </div>
        </div>
      </div>

      {/* --- COLONNE DROITE : RÉSULTAT VISUEL & TEXTE --- */}
      <div className="lg:col-span-8">
        {content && (
          <div className="bg-white h-full rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row">
            
            {/* PARTIE VISUELLE (Silhouette) */}
            <div className="md:w-5/12 bg-gray-50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 relative">
               <BodySilhouette gender={selectedGender} zones={content.colorZones} />
               
               {/* Badges flottants sur l'image */}
               <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-500 border border-gray-200 shadow-sm">
                 Vue de face
               </div>
            </div>

            {/* PARTIE TEXTE (Fiche Style) */}
            <div className="md:w-7/12 p-8 flex flex-col justify-center space-y-6">
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-2">
                  {content.title}
                </h2>
                <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
              </div>

              {/* Bloc Principal : La Règle */}
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg">
                <h4 className="text-emerald-800 font-bold uppercase text-xs tracking-wider mb-2">
                  Limites de la 'Awrah
                </h4>
                <p className="text-xl font-serif text-emerald-900 leading-relaxed">
                  « {content.awrahText} »
                </p>
              </div>

              {/* Bloc Preuve / Source */}
              {content.source && (
                <div className="flex gap-3 items-start text-gray-600 italic text-sm">
                  <BookOpen size={18} className="text-emerald-400 mt-1 shrink-0" />
                  <p>{content.source}</p>
                </div>
              )}

              {/* Bloc Attention (Conditionnel) */}
              {content.warning && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 items-start">
                  <AlertTriangle size={20} className="text-amber-600 mt-1 shrink-0" />
                  <div className="text-sm text-amber-900">
                    <span className="font-bold block mb-1">Important :</span>
                    {content.warning}
                  </div>
                </div>
              )}
              
              {/* Note spécifique Ajnabi (Cousins) */}
              {relation === Relation.Ajnabi && selectedGender === Gender.Female && (
                 <div className="bg-red-50 border border-red-100 p-3 rounded text-xs text-red-800">
                    <strong>Rappel :</strong> "Les cousins et les fils de l'oncle, le beau-frère... sont des <u>Ajnabi</u> avec elles."
                 </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- COMPOSANT SILHOUETTE SVG ---
// Une représentation simplifiée pour visualiser les zones
const BodySilhouette: React.FC<{ 
  gender: Gender, 
  zones: { red: string[], green: string[] } 
}> = ({ gender, zones }) => {
  
  // Fonction utilitaire pour déterminer la couleur
  const getColor = (part: string) => {
    if (zones.red.includes(part)) return "#f87171"; // red-400
    if (zones.green.includes(part)) return "#34d399"; // emerald-400
    return "#e5e7eb"; // gray-200 par défaut
  };

  return (
    <svg viewBox="0 0 200 400" className="h-[350px] w-auto drop-shadow-xl">
       <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      {/* --- TÊTE & COU (Différenciation Homme/Femme) --- */}
      {gender === Gender.Female ? (
        <>
          {/* HIJAB (Foulard) - Statique (Gris/Vêtement) */}
          {/* Forme qui englobe la tête et le cou jusqu'aux épaules */}
          <path 
            d="M 60,90 Q 55,40 100,20 Q 145,40 140,90 Z" 
            fill="#64748b" 
            stroke="white" 
            strokeWidth="2" 
          />
          {/* VISAGE - Dynamique (Vert/Rouge selon règle) */}
          <ellipse 
            cx="100" cy="55" rx="22" ry="26" 
            fill={getColor('head')} 
            stroke="white" 
            strokeWidth="2" 
          />
        </>
      ) : (
        <>
          {/* TÊTE HOMME STANDARD */}
          <circle cx="100" cy="50" r="30" fill={getColor('head')} stroke="white" strokeWidth="2" />
          {/* COU HOMME */}
          <rect x="90" y="75" width="20" height="15" fill={getColor('head')} />
        </>
      )}

      {/* TORSE (Haut jusqu'au nombril approx) */}
      <path d="M60,90 Q100,90 140,90 L140,180 L60,180 Z" fill={getColor('torso')} stroke="white" strokeWidth="2" />

      {/* BRAS (Gauche/Droite) */}
      <rect x="35" y="90" width="25" height="100" rx="10" fill={getColor('arms')} stroke="white" strokeWidth="2" />
      <rect x="140" y="90" width="25" height="100" rx="10" fill={getColor('arms')} stroke="white" strokeWidth="2" />

      {/* MAINS */}
      <circle cx="47" cy="200" r="12" fill={getColor('hands')} stroke="white" strokeWidth="2" />
      <circle cx="153" cy="200" r="12" fill={getColor('hands')} stroke="white" strokeWidth="2" />

      {/* AWRAH MAJEURE (Nombril à Genoux) */}
      <rect x="60" y="180" width="80" height="100" fill={getColor('awrah_major')} stroke="white" strokeWidth="2" />

      {/* JAMBES (Bas) */}
      <rect x="65" y="280" width="30" height="90" rx="5" fill={getColor('legs')} stroke="white" strokeWidth="2" />
      <rect x="105" y="280" width="30" height="90" rx="5" fill={getColor('legs')} stroke="white" strokeWidth="2" />

      {/* PIEDS */}
      <path d="M60,370 L95,370 L95,380 L60,380 Z" fill={getColor('feet')} stroke="white" strokeWidth="2" />
      <path d="M105,370 L140,370 L140,380 L105,380 Z" fill={getColor('feet')} stroke="white" strokeWidth="2" />

      {/* Indication visuelle Nombril/Genoux si pertinent */}
      <line x1="55" y1="180" x2="145" y2="180" stroke="white" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
      <line x1="55" y1="280" x2="145" y2="280" stroke="white" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
    </svg>
  );
};

export default AwrahSimulator;
