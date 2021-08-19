package kalba.service;

import kalba.config.ReadConfig;
import kalba.models.account.Name;
import kalba.models.coc.quiz.Quiz;
import kalba.models.coc.quiz.QuizAnswerSheet;
import kalba.repository.QuizRepository;
import lombok.AllArgsConstructor;

import javax.transaction.Transactional;
import java.util.Arrays;
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

    public int markingQuiz(QuizAnswerSheet quizAnswerSheet) {
        int score = 0;
        List<int[]> answer = ReadConfig.readQuizAnswer(ReadConfig.config.quizAnswer);
        int[][] sheet = quizAnswerSheet.getSheet();
        if (sheet.length != answer.size()) {
            return -1;
        } else {
            for (int i = 0; i < sheet.length; i++) {
                int[] arr = answer.get(i);
                if (arr.length != sheet[i].length) {
                    continue;
                }
                boolean isRight = true;
                for (int j = 0; j < sheet[i].length; j++) {
                    if (arr[j] != sheet[i][j]) {
                        isRight = false;
                        break;
                    }
                }
                if (isRight) {
                    score++;
                }
            }
        }
        return Math.round(score * 100f / sheet.length);
    }
}
