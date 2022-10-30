package kr.kalba.infrastructure.repository

import kr.kalba.domain.mongo.Account
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface AccountRepository : MongoRepository<Account, String> {
    fun findByAccountName(accountName: String): Account?

    fun findByTag(tag: String): Account?
}