package kalba.repository;

import kalba.models.coc.quiz.MemberQuizState;
import kalba.models.coc.quiz.Quiz;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class JdbcQuizRepository implements QuizRepository {
    private final JdbcTemplate jdbcTemplate;

    public JdbcQuizRepository(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public Quiz passQuiz(Quiz quiz) {
        SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbcTemplate);
        insert.withTableName("quiz").usingGeneratedKeyColumns("id");
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("name", quiz.getName());
        parameters.put("score", quiz.getScore());
        Number key = insert.executeAndReturnKey(new MapSqlParameterSource(parameters));
        quiz.setId(key.intValue());
        return quiz;
    }

    @Override
    public List<Quiz> findAll() {
        return jdbcTemplate.query("select * from quiz", quizRowMapper());
    }

    @Override
    public Optional<Quiz> findByName(String name) {
        List<Quiz> result = jdbcTemplate.query("select * from quiz where name = ? ", quizRowMapper(), name);
        return result.stream().findAny();
    }

    private RowMapper<Quiz> quizRowMapper() {
        return (rs, rowNum) -> Quiz.builder()
                .id(rs.getInt("id"))
                .name(rs.getString("name"))
                .score(rs.getInt("score"))
                .build();
    }

    @Override
    public List<MemberQuizState> findAllQuizState() {
        return jdbcTemplate.query("select account.name, quiz.score from quiz right join account on account.name = quiz.name",(rs, rowNum) -> MemberQuizState.builder()
                .name(rs.getString("name"))
                .score(rs.getInt("score"))
                .build());
    }
}
