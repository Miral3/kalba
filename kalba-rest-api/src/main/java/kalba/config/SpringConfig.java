package kalba.config;

import kalba.repository.AccountRepository;
import kalba.repository.JdbcAccountRepository;
import kalba.repository.JdbcQuizRepository;
import kalba.repository.QuizRepository;
import kalba.service.AccountService;
import kalba.service.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@AllArgsConstructor
public class SpringConfig {
    private final DataSource dataSource;

    @Bean
    public AccountService accountService() {
        return new AccountService(accountRepository());
    }

    @Bean
    public AccountRepository accountRepository() {
        return new JdbcAccountRepository(dataSource);
    }

    @Bean
    public QuizService quizService() {
        return new QuizService(quizRepository());
    }

    @Bean
    public QuizRepository quizRepository() {
        return new JdbcQuizRepository(dataSource);
    }
}
