package kr.kalba

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class KalbaApplication

fun main(args: Array<String>) {
    runApplication<KalbaApplication>(*args)
}
