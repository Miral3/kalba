package kalba;

import kalba.repository.ClanMemberRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        Thread thread = new ClanMemberRepository();
        thread.start();
        SpringApplication.run(Main.class, args);
    }
}
