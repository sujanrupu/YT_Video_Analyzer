export default function VideoInput({ videoUrl, setVideoUrl, getSummary, loadingAction }) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter YouTube Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800"
      />
      <button
        onClick={getSummary}
        className="w-full p-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500"
      >
        {loadingAction === 'summary' ? 'Loading...' : 'Get Summary'}
      </button>
    </div>
  );
}
