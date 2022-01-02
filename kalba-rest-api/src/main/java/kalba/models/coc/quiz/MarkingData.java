package kalba.models.coc.quiz;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class MarkingData {
    int score;
    List<Integer> wrongAnswerList;
}
