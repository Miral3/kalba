package kalba.config;

import com.esotericsoftware.yamlbeans.YamlReader;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class ReadConfig {
    public static final ReadConfig config = fromFile();
    public List<Object> quizAnswer;

    private static ReadConfig fromFile() {
        try {
            YamlReader reader = new YamlReader(new FileReader("config.yaml"));
            ReadConfig config = reader.read(ReadConfig.class);
            reader.close();
            return config;
        } catch (FileNotFoundException e) {
            String message = "config.yaml" + " 파일을 읽을 수 없습니다.\n" + e.getMessage();
            throw new RuntimeException(message);
        } catch (IOException e) {
            String message = "config.yaml" + " 파일을 정상적으로 읽지 못하였습니다." + "config.yaml" + "\n" + e.getMessage();
            throw new RuntimeException(message);
        }
    }
}