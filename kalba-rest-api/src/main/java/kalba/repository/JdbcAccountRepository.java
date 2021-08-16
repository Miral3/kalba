package kalba.repository;

import kalba.models.account.Account;
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
        Number key = insert.executeAndReturnKey(new MapSqlParameterSource(parameters));
        account.setId(key.intValue());
        return account;
    }

    @Override
    public List<Account> findAll() {
        return jdbcTemplate.query("select * from account", accountRowMapper());
    }

    @Override
    public Optional<Account> findByName(String name) {
        List<Account> result = jdbcTemplate.query("select * from account where name = ? ", accountRowMapper(), name);
        return result.stream().findAny();
    }

    private RowMapper<Account> accountRowMapper() {
        return (rs, rowNum) -> Account.builder()
                .id(rs.getInt("id"))
                .name(rs.getString("name"))
                .tag(rs.getString("tag"))
                .nickname(rs.getString("nickname"))
                .password(rs.getString("password"))
                .role(rs.getString("role"))
                .build();
    }
}
