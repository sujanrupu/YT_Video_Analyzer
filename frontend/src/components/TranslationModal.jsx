import { X } from 'lucide-react';

export default function TranslationModal({ translatedSummary, language, setShowTranslationModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-gray-800 text-white max-w-lg w-full p-6 rounded-lg relative pointer-events-auto">
        <button
          onClick={() => setShowTranslationModal(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X />
        </button>
        <h3 className="text-xl font-bold mb-4">Translated Summary ({language}):</h3>
        <p className="bg-gray-700 p-4 rounded-lg">{translatedSummary}</p>
      </div>
    </div>
  );
}
