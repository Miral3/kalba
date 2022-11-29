package kr.kalba.presentation.controller

import kr.kalba.application.AccountService
import kr.kalba.application.ClanService
import kr.kalba.presentation.dto.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/account")
class AccountController(
    val accountService: AccountService,
    val clanService: ClanService
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
    fun checkAdmin(token: CheckAdminDto.Request): ResponseEntity<CheckAdminDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            CheckAdminDto.Response.of(
                accountService.isAdmin(token.token)
            )
        )
    }

    @PostMapping("/verify/token")
    fun verifyToken(@RequestBody request: VerifyTokenDto.Request):  ResponseEntity<VerifyTokenDto.Response> {
        val response = accountService.verifyToken(request.tag, request.token)
        return ResponseEntity.status(HttpStatus.OK).body(
            VerifyTokenDto.Response.of(response.status)
        )
    }

    @ResponseBody
    @GetMapping("/profile/tag")
    fun profile(@RequestParam token: ProfileDto.TokenRequest): ResponseEntity<ProfileDto.Response> {
        val tag = accountService.getUserTag(token.token)
        return ResponseEntity.status(HttpStatus.OK).body(
            ProfileDto.Response.of(clanService.getMemberStatisticByTag(tag))
        )
    }
}
