package kalba.config;

import kalba.repository.*;
import kalba.service.AccountService;
import kalba.service.ClanMemberService;
import kalba.service.QuizService;
import kalba.util.MemberDataManager;
import kalba.util.MemberDataThread;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

import javax.sql.DataSource;

@Configuration
@RequiredArgsConstructor
public class SpringConfig {
    private final DataSource dataSource;
    @Value("${spring.data.mongodb.uri}")
    private String mongoDBUri;
    @Value("${spring.data.mongodb.database}")
    private String mongoDBDatabase;


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

    @Bean
    public StatisticMongoRepository statisticMongoRepository() {
        return new StatisticMongoRepository(mongoTemplate());
    }

    @Bean
    public ClanMemberService clanMemberService() {
        return new ClanMemberService(statisticMongoRepository(), memberDataManager());
    }

    @Bean
    public MongoDatabaseFactory mongoDatabaseFactory() {
        return new SimpleMongoClientDatabaseFactory(mongoDBUri + "/" + mongoDBDatabase);
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoDatabaseFactory());
    }

    @Bean
    public MemberDataThread memberDataThread() {
        MemberDataThread memberDataThread = new MemberDataThread(memberDataManager());
        memberDataThread.start();
        return memberDataThread;
    }

    @Bean
    public MemberDataManager memberDataManager() {
        return new MemberDataManager(statisticMongoRepository());
    }
}
