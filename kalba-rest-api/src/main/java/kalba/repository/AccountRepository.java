package kalba.repository;

import kalba.models.account.Account;
import kalba.models.account.AccountInfo;

import java.util.List;
import java.util.Optional;

public interface AccountRepository {
    Account register(Account member);

    List<Account> findAll();

    Optional<Account> findByName(String name);

    Optional<Account> findByTag(String tag);

    Optional<AccountInfo> findAccountInfoByName(String name);
}
