package com.example.analyzer.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private String videoSummary = "";
    private List<Map<String, String>> quizData = new ArrayList<>();

    public Map<String, Object> summarizeVideo(String url) {
        videoSummary = "This is a mock summary for URL: " + url;
        List<String> keywords = Arrays.asList("keyword1", "keyword2", "keyword3", "keyword4", "keyword5");

        quizData.clear();

        Map<String, Object> response = new HashMap<>();
        response.put("summary", videoSummary);
        response.put("keywords", keywords);
        return response;
    }

    public String answerQuestion(String question) {
        if (videoSummary.isEmpty()) {
            throw new RuntimeException("Please summarize a video first");
        }
        return "This is a mock answer to: " + question;
    }

    public String translateText(String text, String language) {
        return "Translated (" + language + "): " + text;
    }

    public List<Map<String, String>> generateProbableQA(String summary) {
        List<Map<String, String>> qaPairs = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            Map<String, String> qa = new HashMap<>();
            qa.put("question", "Sample Question " + i);
            qa.put("answer", "Sample Answer " + i);
            qaPairs.add(qa);
        }
        return qaPairs;
    }

    public List<Map<String, Object>> generateQuiz(String summary) {
        quizData.clear();
        List<Map<String, Object>> questions = new ArrayList<>();

        for (int i = 1; i <= 4; i++) {
            Map<String, Object> q = new HashMap<>();
            q.put("question", "MCQ Question " + i);
            List<String> options = Arrays.asList("Option A", "Option B", "Option C", "Option D");
            q.put("options", options);

            Map<String, String> quizInfo = new HashMap<>();
            quizInfo.put("correctOption", "A");
            quizInfo.put("correctAnswerText", "Option A");
            quizData.add(quizInfo);

            questions.add(q);
        }

        return questions;
    }

    public Map<String, Object> calculateQuizScore(Map<Integer, String> answers) {
        int score = 0;
        List<Map<String, Object>> detailedResults = new ArrayList<>();

        for (int i = 0; i < quizData.size(); i++) {
            String correct = quizData.get(i).get("correctAnswerText");
            String userAnswer = answers.getOrDefault(i, null);

            boolean isCorrect = correct.equals(userAnswer);
            if (isCorrect) score++;

            Map<String, Object> result = new HashMap<>();
            result.put("questionIndex", i);
            result.put("correctAnswer", correct);
            result.put("userAnswer", userAnswer);
            result.put("isCorrect", isCorrect);
            detailedResults.add(result);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("score", score);
        response.put("detailedResults", detailedResults);
        return response;
    }
}
