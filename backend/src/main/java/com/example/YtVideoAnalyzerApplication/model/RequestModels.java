package com.example.analyzer.model;

import java.util.Map;

public class RequestModels {

    public static class UrlRequest {
        public String url;
    }

    public static class QuestionRequest {
        public String question;
    }

    public static class TranslateRequest {
        public String text;
        public String language;
    }

    public static class SummaryRequest {
        public String summary;
    }

    public static class AnswersRequest {
        public Map<Integer, String> answers;
    }
}
