package kalba.controller;

import kalba.models.account.*;
import kalba.models.coc.Quiz;
import kalba.models.coc.QuizDto;
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
}