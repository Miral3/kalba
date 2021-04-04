package kalba.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class YonghaScore implements Comparable<YonghaScore> {
    private String name;
    private int score;
    private int trophies;

    @Override
    public int compareTo(YonghaScore o) {
        int result=Integer.compare(o.getScore(), this.score);
        if(result==0){
            result= Integer.compare(o.getTrophies(), this.trophies);
            if(result==0){
                return this.name.compareTo(o.getName());
            } else {
                return result;
            }
        } else {
            return result;
        }
    }
}