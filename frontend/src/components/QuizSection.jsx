export default function QuizSection({
  quizQuestions,
  quizStarted,
  generateQuiz,
  selectedAnswers,
  setSelectedAnswers,
  submitQuiz,
  score,
  quizResult,
  loadingAction,
}) {
  if (!quizStarted) {
    return (
      <button
        onClick={generateQuiz}
        className="w-full p-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-600"
      >
        {loadingAction === 'quiz' ? 'Generating Quiz...' : 'Start Quiz'}
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Quiz (4 Questions):</h3>
      {quizQuestions.map((q, idx) => {
        const result = quizResult.find((r) => r.questionIndex === idx);

        return (
          <div key={idx} className="bg-gray-800 p-4 rounded-lg space-y-2">
            <p><strong>Q{idx + 1}:</strong> {q.question}</p>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((opt, oidx) => {
                let optionStyle = 'p-2 rounded-lg border border-gray-600 bg-gray-700';

                if (score !== null && result) {
                  if (opt === result.correctAnswer) optionStyle += ' bg-green-500 text-black';
                  else if (opt === result.userAnswer) optionStyle += ' bg-red-500 text-black';
                } else if (selectedAnswers[idx] === opt) {
                  optionStyle += ' bg-yellow-500 text-black';
                }

                return (
                  <button
                    key={oidx}
                    disabled={score !== null}
                    onClick={() =>
                      setSelectedAnswers({ ...selectedAnswers, [idx]: opt })
                    }
                    className={optionStyle}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {score === null ? (
        <button
          onClick={submitQuiz}
          className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Submit Quiz
        </button>
      ) : (
        <div className="text-center text-lg font-bold mt-4">
          Your Score: {score}/{quizQuestions.length}
        </div>
      )}
    </div>
  );
}
