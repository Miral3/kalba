package kalba.service;

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
        if (validateDuplicateName(account)) {
            return -1; // 중복 계정 이름 있음
        } else if(validateDuplicateTag(account)){
            return -2; // 중복 태그 있음
        }
        accountRepository.register(account);
        return account.getId();
    }

    private boolean validateDuplicateName(Account account) {
        return accountRepository.findByName(account.getName()).isPresent();
    }

    private boolean validateDuplicateTag(Account account){
         return accountRepository.findByTag(account.getTag()).isPresent();
    }

    public List<Account> findAllAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> findAccountByName(String name) {
        return accountRepository.findByName(name);
    }

    public Optional<AccountInfo> findAccountInfoByName(String name) {
        return accountRepository.findAccountInfoByName(name);
    }
}
