package kalba;

import kalba.handler.ClanMemberHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        Thread thread = new ClanMemberHandler();
        thread.start();
        SpringApplication.run(Main.class, args);
    }
}
