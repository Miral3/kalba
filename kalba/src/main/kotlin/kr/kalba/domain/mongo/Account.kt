package kr.kalba.domain.mongo

import kr.kalba.presentation.dto.RegisterDto
import org.springframework.data.mongodb.core.mapping.Document

@Document("account")
class Account(
    val accountName: String,
    val cocName: String,
    val tag: String,
    val password: String,
    val role: String,
    val attackState: Boolean,
    val warningState: Boolean
) {
    companion object {
        fun of(registerDto: RegisterDto.Request, encryptedPassword: String): Account {
            return Account(
                accountName = registerDto.accountName,
                cocName = registerDto.cocName,
                tag = registerDto.tag,
                password = encryptedPassword,
                role = "USER",
                attackState = false,
                warningState = false
            )
        }
    }
}