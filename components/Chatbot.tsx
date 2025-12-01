import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Assalamu alaykum. Je suis votre assistant pour la Fiche N°8. Avez-vous une question sur la Awrah ou le Mauvais Œil ?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !process.env.API_KEY) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: userMessage }
            ]
          }
        ],
        config: {
          systemInstruction: `Tu es un assistant pédagogique bienveillant, expert sur la "Fiche 8 - Les Péchés des Yeux" (jurisprudence islamique).
          
          Contexte de la fiche :
          1. Définition: Interdit de regarder la Awrah (parties intimes). Citation d'Al-Akhdari sur l'obligation de préserver les yeux.
          2. Preuves: Sourate An-Nur versets 30 (hommes) et 31 (femmes).
          3. Limites de la Awrah :
             - Homme vs Homme / Mahram: Entre nombril et genoux.
             - Homme vs Femme étrangère: Regard interdit sauf nécessité.
             - Femme vs Mahram: Tout sauf tête et extrémités.
             - Femme vs Femme: Entre nombril et genoux.
             - Femme vs Homme étranger: Tout le corps est Awrah.
          4. Mauvais Œil (Al-Ayn): Vérité confirmée par le Prophète. Différent de l'envie. Cause : admiration + jalousie.
          5. Remède (Ghusl): Le responsable se lave visage, mains, coudes, genoux, pieds, intérieur du pagne. On verse l'eau sur le malade.
          6. Prévention: Dire "Allahumma Barik".

          Règles:
          - Tes réponses doivent être basées uniquement sur ces informations.
          - Sois poli, concis et pédagogique.
          - Si la question sort du contexte religieux strict de la fiche, rappelle gentiment le sujet.
          - Utilise le tutoiement respectueux ou le vouvoiement selon la question.`,
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "Désolé, je n'ai pas pu générer de réponse." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Une erreur est survenue. Veuillez vérifier votre clé API ou réessayer plus tard." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in border border-gray-200">
          {/* Header */}
          <div className="p-4 bg-emerald-600 text-white rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold">Assistant Fiche 8</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-emerald-700 p-1 rounded">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                  <Loader2 size={16} className="animate-spin text-emerald-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez une question..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;