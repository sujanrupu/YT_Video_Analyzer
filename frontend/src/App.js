import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import VideoInput from './components/VideoInput';
import SummarySection from './components/SummarySection';
import QuestionSection from './components/QuestionSection';
import QuizSection from './components/QuizSection';
import TranslationModal from './components/TranslationModal';

export default function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [translatedSummary, setTranslatedSummary] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [language, setLanguage] = useState('english');
  const [error, setError] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [probableQA, setProbableQA] = useState([]);
  const [qaHistory, setQaHistory] = useState([]);
  const [loadingAction, setLoadingAction] = useState('');
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [quizResult, setQuizResult] = useState([]);

  const cleanText = (text) => text.replace(/\*\*/g, '').replace(/[`*_#>]/g, '').replace(/\[.*?\]\(.*?\)/g, '').trim();

  const getSummary = async () => {
    setError('');
    setTranslatedSummary('');
    setKeywords([]);
    setProbableQA([]);
    setQaHistory([]);
    setQuizQuestions([]);
    setQuizStarted(false);
    setScore(null);
    setQuizResult([]);
    setLoadingAction('summary');

    const res = await fetch('https://video-analysis-backend-lan5.onrender.com/api/summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: videoUrl }),
    });
    const data = await res.json();
    setLoadingAction('');

    if (data.error) setError(data.error);
    setSummary(data.summary);
    setKeywords(data.keywords || []);
  };

  const translateSummary = async (lang) => {
    if (!summary) return;
    setTranslationLoading(true);

    const res = await fetch('https://video-analysis-backend-lan5.onrender.com/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: summary, language: lang }),
    });
    const data = await res.json();
    setTranslatedSummary(data.translation);
    setTranslationLoading(false);
    setShowTranslationModal(true);
  };

  const askQuestion = async () => {
    setError('');
    setLoadingAction('question');

    const res = await fetch('https://video-analysis-backend-lan5.onrender.com/api/question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setLoadingAction('');

    if (data.error) setError(data.error);
    setAnswer(data.answer);
    setQaHistory([...qaHistory, { question, answer: data.answer }]);
    setQuestion('');
  };

  const generateProbableQA = async () => {
    if (!summary) return;
    setLoadingAction('probable');

    const res = await fetch('https://video-analysis-backend-lan5.onrender.com/api/probable-qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ summary }),
    });
    const data = await res.json();
    setLoadingAction('');
    const cleaned = (data.qaPairs || []).map((qa) => ({
      question: cleanText(qa.question),
      answer: cleanText(qa.answer),
    }));
    setProbableQA(cleaned);
  };

  const generateQuiz = async () => {
    setLoadingAction('quiz');
    setQuizQuestions([]);
    setQuizStarted(false);
    setSelectedAnswers({});
    setScore(null);
    setQuizResult([]);

    const res = await fetch('https://video-analysis-backend-lan5.onrender.com/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ summary }),
    });

    const data = await res.json();
    setLoadingAction('');
    setQuizQuestions(data.questions || []);
    setQuizStarted(true);
  };

  const submitQuiz = async () => {
    const res = await fetch('https://video-analysis-backend-lan5.onrender.com/api/quiz-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: selectedAnswers }),
    });
    const data = await res.json();
    setScore(data.score);
    setQuizResult(data.detailedResults);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <VideoInput
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          getSummary={getSummary}
          loadingAction={loadingAction}
        />

        {summary && (
          <div className="space-y-4">
            <QuestionSection
              question={question}
              setQuestion={setQuestion}
              askQuestion={askQuestion}
              loadingAction={loadingAction}
              qaHistory={qaHistory}
            />

            <QuizSection
              quizQuestions={quizQuestions}
              quizStarted={quizStarted}
              generateQuiz={generateQuiz}
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
              submitQuiz={submitQuiz}
              score={score}
              quizResult={quizResult}
              loadingAction={loadingAction}
            />
          </div>
        )}

        <SummarySection
          summary={summary}
          keywords={keywords}
          language={language}
          setLanguage={setLanguage}
          translateSummary={translateSummary}
          translationLoading={translationLoading}
          generateProbableQA={generateProbableQA}
          loadingAction={loadingAction}
          probableQA={probableQA}
        />
      </div>

      <Footer />

      {showTranslationModal && (
        <TranslationModal
          translatedSummary={translatedSummary}
          language={language}
          setShowTranslationModal={setShowTranslationModal}
        />
      )}
    </div>
  );
}