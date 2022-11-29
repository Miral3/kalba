package kr.kalba.presentation.dto

import kr.kalba.domain.mongo.Statistic
import org.springframework.util.ObjectUtils

class ProfileDto {
    class Request(
        val tag: String
    )

    class TokenRequest(
        val token: String
    )

    class Response(
        val tag: String,
        val name: String,
        val role: String,
        val badge: String,
        val donations: Int,
        val score: Int,
    ) {
        companion object {
            fun of(statistic: Statistic): Response {
                return Response(
                    tag = statistic.tag,
                    name = statistic.name,
                    role = statistic.role,
                    badge = if (ObjectUtils.isEmpty(statistic.league)) {
                        ""
                    } else {
                        statistic.league!!.iconMedium
                    },
                    donations = statistic.donations,
                    score = statistic.score
                )
            }
        }
    }
}