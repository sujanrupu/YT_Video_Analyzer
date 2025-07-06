export default function SummarySection({
  summary,
  keywords,
  language,
  setLanguage,
  translateSummary,
  translationLoading,
  generateProbableQA,
  loadingAction,
  probableQA,
}) {
  if (!summary) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Summary:</h2>
      <p className="bg-gray-800 p-4 rounded-lg">{summary}</p>

      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.map((kw, idx) => (
            <span key={idx} className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm">
              {kw}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-4 items-center">
        <label>Translate:</label>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            translateSummary(e.target.value);
          }}
          className="bg-gray-800 border border-gray-700 p-2 rounded-lg"
        >
          <option value="hindi">Hindi</option>
          <option value="bengali">Bengali</option>
        </select>
        {translationLoading && (
          <span className="text-yellow-400 font-semibold">Loading...</span>
        )}
      </div>

      <button
        onClick={generateProbableQA}
        className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        {loadingAction === 'probable' ? 'Loading...' : 'Generate Probable Q&A'}
      </button>

      {probableQA.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold">Probable Questions & Answers:</h3>
          {probableQA.map((qa, idx) => (
            <div key={idx} className="p-4 bg-gray-800 rounded-lg">
              <p><strong>Q:</strong> {qa.question}</p>
              <p><strong>A:</strong> {qa.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
