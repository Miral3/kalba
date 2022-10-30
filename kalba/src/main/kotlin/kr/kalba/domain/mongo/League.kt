package kr.kalba.domain.mongo

import org.springframework.util.ObjectUtils

class League(
    val id: Int,
    val name: String,
    val iconTiny: String,
    val iconSmall: String,
    val iconMedium: String
) {

    companion object {
        fun of(league: Map<String, Any>): League {
            val iconUrls = league["iconUrls"] as Map<String, String>
            return League(
                id = league["id"] as Int,
                name = league["name"] as String,
                iconTiny = iconUrls["tiny"]!!,
                iconSmall = iconUrls["small"]!!,
                iconMedium = if (ObjectUtils.isEmpty(iconUrls["medium"])) {
                    iconUrls["small"] as String
                } else {
                    iconUrls["medium"] as String
                }
            )
        }
    }
}