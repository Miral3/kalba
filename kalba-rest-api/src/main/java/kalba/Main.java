package kalba;

import kalba.service.ClanMemberService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        Thread thread = new ClanMemberService();
        thread.start();
        SpringApplication.run(Main.class, args);
    }
}
