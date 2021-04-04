package kalba.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class YonghaScore implements Comparable<YonghaScore> {
    private String name;
    private double score;

    @Override
    public int compareTo(YonghaScore o) {
        return Double.compare(o.getScore(), this.score);
    }
}