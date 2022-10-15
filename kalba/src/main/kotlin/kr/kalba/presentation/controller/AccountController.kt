package kr.kalba.presentation.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URI

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class AccountController {

    @PostMapping("/test")
    fun test(): ResponseEntity<Map<Any, Any>> {
        return ResponseEntity.created(URI.create("/test")).body(mapOf("message" to "success"))
    }
}
