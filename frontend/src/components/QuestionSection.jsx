export default function QuestionSection({
  question,
  setQuestion,
  askQuestion,
  loadingAction,
  qaHistory,
}) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Ask a question from the video"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800"
      />
      <button
        onClick={askQuestion}
        className="w-full p-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600"
      >
        {loadingAction === 'question' ? 'Loading...' : 'Ask Question'}
      </button>

      {qaHistory.map((qa, idx) => (
        <div key={idx} className="p-4 bg-gray-800 rounded-lg space-y-2">
          <p><strong>Q:</strong> {qa.question}</p>
          <p><strong>A:</strong> {qa.answer}</p>
        </div>
      ))}
    </div>
  );
}
