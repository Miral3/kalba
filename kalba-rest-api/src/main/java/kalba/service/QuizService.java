package kalba.service;

import kalba.models.account.Account;
import kalba.models.account.Name;
import kalba.models.coc.Quiz;
import kalba.repository.AccountRepository;
import kalba.repository.QuizRepository;
import lombok.AllArgsConstructor;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
@AllArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;

    public Quiz passQuiz(Quiz quiz) {
        quizRepository.passQuiz(quiz);
        return quiz;
    }

    public boolean isPassedUser(Name name) {
        return quizRepository.findByName(name.getName()).isPresent();
    }

    public List<Quiz> findAllPassedUser() {
        return quizRepository.findAll();
    }

    public Optional<Quiz> findByName(String name) {
        return quizRepository.findByName(name);
    }
}
