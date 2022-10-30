package kr.kalba

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories
import org.springframework.scheduling.annotation.EnableAsync

@SpringBootApplication
@EnableAsync
class KalbaApplication

fun main(args: Array<String>) {
    runApplication<KalbaApplication>(*args)
}
