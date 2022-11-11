package kr.kalba.infrastructure.repository

import kr.kalba.domain.mongo.MemberOpenChatState
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface MemberOpenChatStateRepository : MongoRepository<MemberOpenChatState, String>