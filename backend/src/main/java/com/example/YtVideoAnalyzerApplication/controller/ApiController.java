package com.example.analyzer.controller;

import com.sujan.analyzer.model.RequestModels.*;
import com.sujan.analyzer.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/summary")
    public Map<String, Object> summarize(@RequestBody UrlRequest request) {
        return geminiService.summarizeVideo(request.url);
    }

    @PostMapping("/question")
    public Map<String, String> askQuestion(@RequestBody QuestionRequest request) {
        String answer = geminiService.answerQuestion(request.question);
        return Collections.singletonMap("answer", answer);
    }

    @PostMapping("/translate")
    public Map<String, String> translate(@RequestBody TranslateRequest request) {
        String translated = geminiService.translateText(request.text, request.language);
        return Collections.singletonMap("translation", translated);
    }

    @PostMapping("/probable-qa")
    public Map<String, Object> probableQa(@RequestBody SummaryRequest request) {
        List<Map<String, String>> qaPairs = geminiService.generateProbableQA(request.summary);
        return Collections.singletonMap("qaPairs", qaPairs);
    }

    @PostMapping("/quiz")
    public Map<String, Object> quiz(@RequestBody SummaryRequest request) {
        List<Map<String, Object>> questions = geminiService.generateQuiz(request.summary);
        return Collections.singletonMap("questions", questions);
    }

    @PostMapping("/quiz-score")
    public Map<String, Object> quizScore(@RequestBody AnswersRequest request) {
        return geminiService.calculateQuizScore(request.answers);
    }
}
