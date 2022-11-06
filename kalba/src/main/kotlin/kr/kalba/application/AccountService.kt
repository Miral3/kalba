package kr.kalba.application

import kr.kalba.domain.mongo.Account
import kr.kalba.infrastructure.constant.Errors
import kr.kalba.infrastructure.exception.CommonException
import kr.kalba.infrastructure.external.coc.ClashOfClanService
import kr.kalba.infrastructure.external.coc.dto.VerifyTokenResponse
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
    val jwtTokenUtil: JwtTokenUtil,
    val clashOfClanService: ClashOfClanService
) {
    fun register(registerDto: RegisterDto.Request): Account {
        if (validateDuplicateName(registerDto)) {
            throw CommonException(Errors.REGISTER_DUPLICATE_NAME)
        } else if (validateDuplicateTag(registerDto)) {
            throw CommonException(Errors.REGISTER_DUPLICATE_TAG)
        }
        val encryptedPassword = passwordEncoder.encode(registerDto.password)
        return accountRepository.save(Account.of(registerDto, encryptedPassword))
    }

    fun verifyToken(tag: String, token: String): VerifyTokenResponse {
        return clashOfClanService.verifyToken(tag, token)
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
            throw CommonException(Errors.LOGIN_DISABLE_USER)
        } catch (e: BadCredentialsException) {
            throw CommonException(Errors.LOGIN_INVALID_PASSWORD)
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