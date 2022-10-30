package kr.kalba.application

import kr.kalba.domain.mongo.Account
import kr.kalba.infrastructure.external.security.JwtTokenUtil
import kr.kalba.infrastructure.external.security.JwtUserDetailsService
import kr.kalba.infrastructure.repository.AccountRepository
import kr.kalba.presentation.dto.LoginDto
import kr.kalba.presentation.dto.RegisterDto
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.DisabledException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.util.ObjectUtils

@Service
class AccountService(
    val accountRepository: AccountRepository,
    val passwordEncoder: PasswordEncoder,
    val authenticationManager: AuthenticationManager,
    val jwtUserDetailsService: JwtUserDetailsService,
    val jwtTokenUtil: JwtTokenUtil
) {
    fun register(registerDto: RegisterDto.Request): Account {
        if (validateDuplicateName(registerDto)) {
            throw Exception()
        } else if (validateDuplicateTag(registerDto)) {
            throw Exception()
        }
        val encryptedPassword = passwordEncoder.encode(registerDto.password)
        return accountRepository.save(Account.of(registerDto, encryptedPassword))
    }

    private fun validateDuplicateName(registerDto: RegisterDto.Request): Boolean {
        return !ObjectUtils.isEmpty(accountRepository.findByAccountName(registerDto.accountName))
    }

    private fun validateDuplicateTag(registerDto: RegisterDto.Request): Boolean {
        return !ObjectUtils.isEmpty(accountRepository.findByTag(registerDto.tag))
    }

    fun login(loginDto: LoginDto.Request): String {
        try {
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    loginDto.accountName,
                    loginDto.password
                )
            )
        } catch (e: DisabledException) {
            throw Exception()
        } catch (e: BadCredentialsException) {
            throw Exception()
        }
        val userDetails = jwtUserDetailsService.loadUserByUsername(loginDto.accountName)
        return jwtTokenUtil.generateToken(userDetails)
    }

    fun getAccountInfo(accountName: String): Account {
        return accountRepository.findByAccountName(accountName)!!
    }

    fun getAccountInfoAll(): List<Account> {
        return accountRepository.findAll()
    }

    fun isAdmin(token: String): Boolean {
        val name = jwtTokenUtil.getUsernameFromToken(token)
        val account = accountRepository.findByAccountName(name)
        if (ObjectUtils.isEmpty(account)) {
            return false
        }
        return account!!.role == "ADMIN"
    }
}