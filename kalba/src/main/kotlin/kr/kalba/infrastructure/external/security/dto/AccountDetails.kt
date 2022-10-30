package kr.kalba.infrastructure.external.security.dto

import kr.kalba.domain.mongo.Account
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class AccountDetails(
    val accountName: String,
    val cocName: String,
    val tag: String,
    val accountPassword: String,
    val role: String,
    val attackState: Boolean,
    val warningState: Boolean
) : UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableSetOf<GrantedAuthority>(SimpleGrantedAuthority(role))
    }

    override fun getPassword(): String {
        return accountPassword
    }

    override fun getUsername(): String {
        return accountName
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }

    companion object {
        fun of(account: Account): AccountDetails {
            return AccountDetails(
                accountName = account.accountName,
                cocName = account.cocName,
                tag = account.tag,
                accountPassword = account.password,
                role = account.role,
                attackState = account.attackState,
                warningState = account.warningState
            )
        }
    }
}