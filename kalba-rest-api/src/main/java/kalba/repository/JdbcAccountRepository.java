package kalba.repository;

import kalba.models.account.Account;
import kalba.models.account.AccountInfo;
import kalba.models.account.AccountQuizAndState;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class JdbcAccountRepository implements AccountRepository {
    private final JdbcTemplate jdbcTemplate;

    public JdbcAccountRepository(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public Account register(Account account) {
        SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbcTemplate);
        insert.withTableName("account").usingGeneratedKeyColumns("id");
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("name", account.getName());
        parameters.put("tag", account.getTag());
        parameters.put("nickname", account.getNickname());
        parameters.put("password", account.getPassword());
        parameters.put("role", account.getRole());
        parameters.put("attack_state", account.isAttackState());
        parameters.put("warning_state", account.isWarningState());
        Number key = insert.executeAndReturnKey(new MapSqlParameterSource(parameters));
        account.setId(key.intValue());
        return account;
    }

    @Override
    public List<Account> findAll() {
        return jdbcTemplate.query("select * from account", accountRowMapper());
    }

    @Override
    public List<AccountInfo> findAllAccountInfo() {
        return jdbcTemplate.query("select * from account", accountInfoRowMapper());
    }

    @Override
    public Optional<Account> findByName(String name) {
        List<Account> result = jdbcTemplate.query("select * from account where name = ? ", accountRowMapper(), name);
        return result.stream().findAny();
    }

    @Override
    public Optional<Account> findByTag(String tag) {
        List<Account> result = jdbcTemplate.query("select * from account where tag = ? ", accountRowMapper(), tag);
        return result.stream().findAny();
    }

    @Override
    public Optional<AccountInfo> findAccountInfoByName(String name) {
        List<AccountInfo> result = jdbcTemplate.query("select * from account where name = ? ", accountInfoRowMapper(), name);
        return result.stream().findAny();
    }

    @Override
    public List<AccountQuizAndState> findAllAccountQuizAndState() {
        return jdbcTemplate.query("select account.name, tag, nickname, attack_state, warning_state, score from account left outer join quiz on account.name = quiz.name", accountQuizAndStateRowMapper());
    }

    public boolean updateMemberAccountQuizAndStateList(List<AccountQuizAndState> list) {
        try {
            for (AccountQuizAndState quizAndState : list) {
                jdbcTemplate.update("update account set attack_state = " + quizAndState.isAttackState() + ", "
                        + "warning_state = " + quizAndState.isWarningState()
                        + " where tag = '" + quizAndState.getTag() + "'");
            }
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    private RowMapper<AccountQuizAndState> accountQuizAndStateRowMapper() {
        return (rs, rowNum) -> AccountQuizAndState.builder()
                .name(rs.getString("name"))
                .nickname(rs.getString("nickname"))
                .tag(rs.getString("tag"))
                .member(true)
                .attackState(rs.getBoolean("attack_state"))
                .warningState(rs.getBoolean("warning_state"))
                .quizScore(rs.getInt("score"))
                .build();
    }

    private RowMapper<AccountInfo> accountInfoRowMapper() {
        return (rs, rowNum) -> AccountInfo.builder()
                .name(rs.getString("name"))
                .tag(rs.getString("tag"))
                .nickname(rs.getString("nickname"))
                .role(rs.getString("role"))
                .attackState(rs.getBoolean("attack_state"))
                .warningState(rs.getBoolean("warning_state"))
                .build();
    }

    private RowMapper<Account> accountRowMapper() {
        return (rs, rowNum) -> Account.builder()
                .id(rs.getInt("id"))
                .name(rs.getString("name"))
                .tag(rs.getString("tag"))
                .nickname(rs.getString("nickname"))
                .password(rs.getString("password"))
                .role(rs.getString("role"))
                .attackState(rs.getBoolean("attack_state"))
                .warningState(rs.getBoolean("warning_state"))
                .build();
    }
}
