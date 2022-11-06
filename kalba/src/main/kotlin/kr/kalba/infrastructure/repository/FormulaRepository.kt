package kr.kalba.infrastructure.repository

import kr.kalba.domain.mongo.Formula
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface FormulaRepository : MongoRepository<Formula, String>{
    fun findByType(type: String): List<Formula>
}