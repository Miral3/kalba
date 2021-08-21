package kalba.repository;

import kalba.models.coc.quiz.MemberQuizState;
import kalba.models.coc.quiz.Quiz;

import java.util.List;
import java.util.Optional;

public interface QuizRepository {
    List<Quiz> findAll();

    Optional<Quiz> findByName(String name);

    Quiz passQuiz(Quiz quiz);

    List<MemberQuizState> findAllQuizState();
}
