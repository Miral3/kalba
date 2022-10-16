package kr.kalba.presentation.controller

import kr.kalba.presentation.dto.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.net.URI

@RestController
@RequestMapping("/account")
class AccountController {

    @PostMapping("/register")
    fun register(@RequestBody request: RegisterDto.Request): ResponseEntity<RegisterDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(RegisterDto.Response.of("success"))
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginDto.Request): ResponseEntity<LoginDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(LoginDto.Response.of("token", "success"))
    }

    @GetMapping("/info")
    fun userInfo(@RequestParam request: UserInfoDto.Request): ResponseEntity<UserInfoDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(
            UserInfoDto.Response
                .of("미랄", "#123", "용하", "어드민", true, true)
        )
    }

    @GetMapping("/info/all")
    fun userInfoAll(): ResponseEntity<UserInfoDto.BulkResponse> {
        return ResponseEntity.status(HttpStatus.OK).body(
            UserInfoDto.BulkResponse
                .of(
                    listOf(
                        UserInfoDto.Response.of("미랄", "#123", "용하", "어드민", true, true),
                        UserInfoDto.Response.of("미랄2", "#124", "용하2", "어드민", false, true),
                        UserInfoDto.Response.of("미랄3", "#125", "용하3", "어드민", true, false),
                        UserInfoDto.Response.of("미랄4", "#126", "용하4", "유저", false, false),
                    )
                )
        )
    }

    @GetMapping("/admin")
    fun checkAdmin(): ResponseEntity<CheckAdminDto.Response> {
        return ResponseEntity.status(HttpStatus.OK).body(CheckAdminDto.Response.of(true))
    }
}
