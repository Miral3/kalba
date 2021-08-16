package kalba.repository;

import kalba.models.account.Account;

import java.util.List;
import java.util.Optional;

public interface AccountRepository {
    Account register(Account member);

    List<Account> findAll();

    Optional<Account> findByName(String name);
}
