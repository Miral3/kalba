package kalba.service;

import kalba.models.account.Account;
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
        if (validateDuplicateMember(account)) {
            return -1; // 중복 계정 있음
        }
        accountRepository.register(account);
        return account.getId();
    }

    private boolean validateDuplicateMember(Account account) {
        return accountRepository.findByName(account.getName()).isPresent();
    }

    public List<Account> findAllAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> finAccountByName(String name) {
        return accountRepository.findByName(name);
    }
}
