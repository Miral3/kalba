package kalba.service;

import kalba.config.ReadConfig;
import kalba.models.account.Name;
import kalba.models.coc.quiz.MarkingData;
import kalba.models.coc.quiz.MemberQuizState;
import kalba.models.coc.quiz.Quiz;
import kalba.models.coc.quiz.QuizAnswerSheet;
import kalba.repository.QuizRepository;
import lombok.AllArgsConstructor;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.LinkedList;
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

    public List<MemberQuizState> findAllState() {
        return quizRepository.findAllQuizState();
    }

    public Optional<Quiz> findByName(String name) {
        return quizRepository.findByName(name);
    }

    public MarkingData markingQuiz(QuizAnswerSheet quizAnswerSheet) {
        int score = 0;
        List<int[]> answer = readQuizAnswer(ReadConfig.config.quizAnswer);
        int[][] sheet = quizAnswerSheet.getSheet();
        List<Integer> wrongAnswerList = new LinkedList<>();
        if (sheet.length != answer.size()) {
            return MarkingData.builder().score(-1).build();
        } else {
            for (int i = 0; i < sheet.length; i++) {
                int[] arr = answer.get(i);
                if (arr.length != sheet[i].length) {
                    wrongAnswerList.add(i + 1);
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
                } else {
                    wrongAnswerList.add(i + 1);
                }
            }
        }
        return MarkingData.builder()
                .score(Math.round(score * 100f / sheet.length))
                .wrongAnswerList(wrongAnswerList)
                .build();
    }

    private List<int[]> readQuizAnswer(List<Object> quizAnswerObjVal) {
        List<int[]> quizAnswer = new ArrayList<>();
        for (Object o : quizAnswerObjVal) {
            quizAnswer.add(stringArrToIntArr(o.toString().split(",")));
        }
        return quizAnswer;
    }

    private int[] stringArrToIntArr(String[] arr) {
        int[] ret = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            ret[i] = Integer.parseInt(arr[i]);
        }
        return ret;
    }
}
