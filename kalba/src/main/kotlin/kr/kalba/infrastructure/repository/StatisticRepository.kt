package kr.kalba.infrastructure.repository

import kr.kalba.domain.mongo.Statistic
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface StatisticRepository : MongoRepository<Statistic, String> {
    fun findByName(name: String): Optional<Statistic>
}