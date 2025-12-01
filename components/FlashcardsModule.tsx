import React, { useState, useEffect } from 'react';
import { RotateCw, ArrowRight, ArrowLeft, Shuffle, CircleHelp } from 'lucide-react';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: 'Definition' | 'Awrah' | 'EvilEye' | 'Quran';
}

const initialCards: Flashcard[] = [
  { id: 1, category: 'Definition', question: "Qu'est-ce que la 'Awrah' ?", answer: "Ce sont les parties du corps d'autrui qu'Allah a interdit de dévoiler et qu'il est interdit de regarder." },
  { id: 2, category: 'Definition', question: "Que signifie 'Mahram' ?", answer: "Une personne de la famille proche avec qui le mariage est interdit à jamais (ex: père, frère, fils)." },
  { id: 3, category: 'Definition', question: "Que signifie 'Ajnabi' ?", answer: "Un étranger (non-Mahram) avec qui le mariage est potentiellement possible." },
  { id: 4, category: 'Quran', question: "Quelle sourate mentionne l'interdiction du regard ?", answer: "Sourate An-Nur (La Lumière), versets 30 et 31." },
  { id: 5, category: 'Awrah', question: "Quelle est la Awrah de l'homme face à un autre homme ?", answer: "Ce qu'il y a entre le nombril et les genoux." },
  { id: 6, category: 'Awrah', question: "Quelle est la Awrah de la femme face à son père (Mahram) ?", answer: "Tout le corps sauf la tête et les extrémités des membres (mains, pieds)." },
  { id: 7, category: 'Awrah', question: "Quelle est la Awrah de la femme face à un homme étranger (Ajnabi) ?", answer: "Tout le corps (certains savants excluent le visage et les mains)." },
  { id: 8, category: 'Awrah', question: "Peut-on regarder son épouse sans restriction ?", answer: "Oui, il n'y a aucune Awrah entre les époux." },
  { id: 9, category: 'EvilEye', question: "Quelle est la différence entre le Mauvais Œil (Al-Ayn) et l'Envie (Hasad) ?", answer: "Le mauvais œil vient d'une admiration (parfois sans méchanceté), l'envie vient du désir que l'autre perde son bienfaits." },
  { id: 10, category: 'EvilEye', question: "Que dire pour éviter de porter le mauvais œil ?", answer: "Dire 'Allahumma Barik' (Qu'Allah bénisse)." },
  { id: 11, category: 'EvilEye', question: "Comment guérir du mauvais œil si l'on connaît le responsable ?", answer: "Par le lavage (Ghusl) spécifique : le responsable se lave certaines parties et on verse l'eau sur le malade." },
  { id: 12, category: 'EvilEye', question: "Le mauvais œil est-il une superstition ?", answer: "Non, le Prophète (ﷺ) a dit : « Le mauvais œil est une vérité »." },
  { id: 13, category: 'Awrah', question: "Quelle est la Awrah d'une femme musulmane face à une autre femme musulmane ?", answer: "Ce qu'il y a entre le nombril et les genoux." },
  { id: 14, category: 'Definition', question: "Que signifie 'Ghad al-Basar' ?", answer: "Baisser le regard (le détourner de l'interdit)." },
  { id: 15, category: 'EvilEye', question: "Quelles parties le responsable du mauvais œil doit-il laver en premier ?", answer: "Le visage et les mains." },
  { id: 16, category: 'EvilEye', question: "Que fait-on de l'eau récupérée après le lavage du responsable ?", answer: "On la verse sur la tête et le dos du malade d'un seul coup." },
  { id: 17, category: 'Awrah', question: "Est-il permis de regarder le visage d'une femme étrangère avec désir ?", answer: "Non, c'est strictement interdit." },
  { id: 18, category: 'Definition', question: "Qui est 'Al-Akhdari' cité dans la fiche ?", answer: "L'auteur du texte de référence (Al-Mukhtasar) sur la jurisprudence malikite." },
  { id: 19, category: 'Quran', question: "Quel est le but de baisser le regard selon le verset 30 ?", answer: "C'est plus pur pour les croyants (Tazkiyah)." },
  { id: 20, category: 'Awrah', question: "Le beau-père est-il un Mahram pour la femme ?", answer: "Oui, par alliance (si le mariage avec la mère a été consommé)." },
];

const FlashcardsModule: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 200);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in p-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 text-emerald-700 font-bold">
          <CircleHelp size={24} />
          <h2>Flashcards Révision</h2>
        </div>
        <button 
          onClick={shuffleCards}
          className="flex items-center gap-2 text-sm bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
        >
          <Shuffle size={16} /> Mélanger
        </button>
      </div>

      <div className="perspective-1000 h-80 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden">
            <div className="bg-white h-full rounded-2xl shadow-xl border-b-4 border-emerald-500 p-8 flex flex-col items-center justify-center text-center">
              <span className="absolute top-4 right-4 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {currentCard.category}
              </span>
              <span className="text-sm text-gray-400 font-medium mb-4">Question</span>
              <h3 className="text-2xl font-bold text-gray-800 leading-relaxed">
                {currentCard.question}
              </h3>
              <p className="absolute bottom-6 text-gray-400 text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <RotateCw size={14} /> Cliquer pour retourner
              </p>
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <div className="bg-emerald-600 h-full rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-center text-white">
              <span className="text-sm text-emerald-200 font-medium mb-4">Réponse</span>
              <p className="text-xl font-medium leading-relaxed">
                {currentCard.answer}
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="flex justify-center items-center gap-6">
        <button 
          onClick={handlePrev}
          className="p-4 bg-white rounded-full shadow-lg text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="font-mono text-gray-500 font-medium">
          {currentIndex + 1} / {cards.length}
        </span>
        <button 
          onClick={handleNext}
          className="p-4 bg-white rounded-full shadow-lg text-gray-600 hover:text-emerald-600 hover:scale-110 transition-all"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default FlashcardsModule;