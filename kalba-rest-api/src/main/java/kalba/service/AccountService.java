package kalba.service;

import kalba.common.exception.AccountConflictException;
import kalba.models.account.Account;
import kalba.models.account.AccountInfo;
import kalba.repository.AccountRepository;
import lombok.AllArgsConstructor;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
@AllArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;

    public int register(Account account) {
        if (validateDuplicateName(account) || validateDuplicateTag(account)) {
            throw new AccountConflictException(); // 중복 계정 이름 있음, 중복 태그 있음
        }

        Account registeredAccount = accountRepository.register(account);
        return registeredAccount.getId();
    }

    private boolean validateDuplicateName(Account account) {
        return accountRepository.findByName(account.getName()).isPresent();
    }

    private boolean validateDuplicateTag(Account account) {
        return accountRepository.findByTag(account.getTag()).isPresent();
    }

    public List<Account> findAllAccounts() {
        return accountRepository.findAll();
    }

    public List<AccountInfo> findAllAccountInfo() {
        return accountRepository.findAllAccountInfo();
    }

    public Optional<Account> findAccountByName(String name) {
        return accountRepository.findByName(name);
    }

    public Optional<AccountInfo> findAccountInfoByName(String name) {
        return accountRepository.findAccountInfoByName(name);
    }
}
