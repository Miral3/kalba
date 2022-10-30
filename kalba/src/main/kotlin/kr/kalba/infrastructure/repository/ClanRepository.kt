package kr.kalba.infrastructure.repository

import kr.kalba.domain.mongo.Clan
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface ClanRepository : MongoRepository<Clan, String> {
    fun findMemberListByTag(tag: String): List<Any>
}