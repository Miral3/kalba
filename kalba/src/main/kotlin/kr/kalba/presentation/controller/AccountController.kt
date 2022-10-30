package kr.kalba.presentation.controller

import kr.kalba.application.AccountService
import kr.kalba.presentation.dto.CheckAdminDto
import kr.kalba.presentation.dto.LoginDto
import kr.kalba.presentation.dto.RegisterDto
import kr.kalba.presentation.dto.UserInfoDto
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/account")
class AccountController(
    val accountService: AccountService
) {

    @PostMapping("/register")
    fun register(@RequestBody request: RegisterDto.Request): ResponseEntity<RegisterDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            RegisterDto.Response.of(
                accountService.register(request)
            )
        )
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginDto.Request): ResponseEntity<LoginDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            LoginDto.Response.of(
                accountService.login(request)
            )
        )
    }

    @GetMapping("/info")
    fun userInfo(@RequestParam name: UserInfoDto.Request): ResponseEntity<UserInfoDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            UserInfoDto.Response.of(
                accountService.getAccountInfo(name.name)
            )
        )
    }

    @GetMapping("/info/all")
    fun userInfoAll(): ResponseEntity<UserInfoDto.BulkResponse> {
        return ResponseEntity.status(HttpStatus.OK).body(
            UserInfoDto.BulkResponse.of(
                accountService.getAccountInfoAll().map { UserInfoDto.Response.of(it) }
            )
        )
    }

    @GetMapping("/admin")
    fun checkAdmin(request: CheckAdminDto.Request): ResponseEntity<CheckAdminDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            CheckAdminDto.Response.of(
                accountService.isAdmin(request.token)
            )
        )
    }
}
