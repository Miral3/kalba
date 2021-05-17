package kalba.config;

import com.esotericsoftware.yamlbeans.YamlReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class ReadConfig {
    public static final ReadConfig config=fromFile();;
    public Object isLocal;
    public Object localToken;
    public Object serverToken;
    public Object dbHost;
    public Object dbPort;
    public Object dbUser;
    public Object dbPassword;
    public Object dbSchema;
    public Object mysqlMinConnection;
    public Object mysqlMaxConnection;


    private static ReadConfig fromFile() {
        try {
            YamlReader reader = new YamlReader(new FileReader("config.yaml"));
            ReadConfig config = reader.read(ReadConfig.class);
            config.isLocal= Boolean.parseBoolean(config.isLocal.toString());
            config.localToken=config.localToken.toString();
            config.serverToken=config.serverToken.toString();
            config.dbHost=config.dbHost.toString();
            config.dbPort= Integer.parseInt(config.dbPort.toString());
            config.dbUser=config.dbUser.toString();
            config.dbPassword=config.dbPassword==null?"":config.dbPassword.toString();
            config.dbSchema=config.dbSchema.toString();
            config.mysqlMaxConnection=Integer.parseInt(config.mysqlMaxConnection.toString());
            config.mysqlMinConnection=Integer.parseInt(config.mysqlMinConnection.toString());
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