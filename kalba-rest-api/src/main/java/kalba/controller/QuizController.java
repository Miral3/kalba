package kalba.controller;

import kalba.models.account.*;
import kalba.models.coc.quiz.Quiz;
import kalba.models.coc.quiz.QuizAnswerSheet;
import kalba.models.coc.quiz.QuizDto;
import kalba.service.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/quiz")
@AllArgsConstructor
public class QuizController {
    private final QuizService quizService;

    @PostMapping("/pass")
    public ResponseEntity<Map<Object, Object>> register(@RequestBody QuizDto quizDto) {
        Quiz quiz = Quiz.builder().name(quizDto.getName())
                .score(quizDto.getScore())
                .build();
        quizService.passQuiz(quiz);
        return ResponseEntity.created(URI.create("/quiz/pass/" + quiz.getName())).body(Map.of("message", "success"));
    }

    @PostMapping("/state")
    public ResponseEntity<?> getUserNameFromToken(@RequestBody Name name) {
        return ResponseEntity.ok(Map.of("state", quizService.isPassedUser(name)));
    }

    @PostMapping("/mark")
    public ResponseEntity<?> markingQuiz(@RequestBody QuizAnswerSheet quizAnswerSheet){
        int score=quizService.markingQuiz(quizAnswerSheet);
        if(score==-1){
            return ResponseEntity.badRequest().body(Map.of("message", "bad request"));
        } else {
            return ResponseEntity.ok(Map.of("score", score));
        }
    }
}