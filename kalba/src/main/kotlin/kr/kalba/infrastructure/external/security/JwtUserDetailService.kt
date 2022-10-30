package kr.kalba.infrastructure.external.security

import kr.kalba.infrastructure.external.security.dto.AccountDetails
import kr.kalba.infrastructure.repository.AccountRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.util.ObjectUtils

@Service
class JwtUserDetailsService(
    private val accountRepository: AccountRepository
) : UserDetailsService {

    override fun loadUserByUsername(accountName: String): UserDetails {
        val account = accountRepository.findByAccountName(accountName)
        if (ObjectUtils.isEmpty(account)) {
            throw UsernameNotFoundException(accountName)
        }
        return AccountDetails.of(account!!)
    }
}