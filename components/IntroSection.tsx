import React from 'react';
import { BookOpen, TriangleAlert } from 'lucide-react';

const IntroSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Definition Block */}
      <section className="bg-white rounded-2xl shadow-sm border-l-4 border-emerald-600 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-100 rounded-full text-emerald-700">
            <TriangleAlert size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Définition de l'Interdit</h2>
            <p className="text-gray-600 leading-relaxed italic">
              "Il s'agit de regarder avec attention les parties du corps d'autrui qu'Allah a interdit de dévoiler. On appelle ces parties du corps « awrah »."
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
              <span className="font-semibold block mb-1">Citation d'Al-Akhdari :</span>
              « Et il lui est obligatoire de préserver ses yeux de regarder l'interdit, et il ne lui est pas autorisé de regarder le musulman (ou toute autre personne) avec un regard nuisible. »
            </div>
          </div>
        </div>
      </section>

      {/* Verses Block */}
      <section className="bg-emerald-900 text-white rounded-2xl shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        <div className="p-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={24} className="text-emerald-300" />
            <h2 className="text-2xl font-bold font-serif">Preuves de l'Interdiction</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Men */}
            <div className="bg-emerald-800/50 p-6 rounded-xl border border-emerald-700">
              <h3 className="text-emerald-300 font-semibold mb-3">Pour les Hommes (Sourate An-Nur, v.30)</h3>
              <p className="arabic-text text-xl text-right mb-4 leading-loose">
                قُل لِّلْمُؤْمِنِينَ يَغُضُّوا مِنْ أَبْصَارِهِمْ وَيَحْفَظُوا فُرُوجَهُمْ
              </p>
              <p className="text-emerald-100 italic text-sm">
                « Dis aux croyants de baisser leurs regards et de préserver leurs parties intimes ; ceci est plus pur pour eux. »
              </p>
            </div>

            {/* Women */}
            <div className="bg-emerald-800/50 p-6 rounded-xl border border-emerald-700">
              <h3 className="text-emerald-300 font-semibold mb-3">Pour les Femmes (Sourate An-Nur, v.31)</h3>
              <p className="arabic-text text-xl text-right mb-4 leading-loose">
                وَقُل لِّلْمُؤْمِنَاتِ يَغْضُضْنَ مِنْ أَبْصَارِهِنَّ وَيَحْفَظْنَ فُرُوجَهُنَّ
              </p>
              <p className="text-emerald-100 italic text-sm">
                « Dis aux croyantes de baisser leur regard et de préserver leurs parties intimes. »
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center text-emerald-200 text-sm">
            <p>Le verset 31 indique l'interdit de dévoiler sa 'awrah pour l'homme comme pour la femme.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroSection;