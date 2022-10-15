package kr.kalba.domain.dynamodb

class Formula(
    val id: Long,
    val name: String,
    val korean: String,
    val value: Double,
    val maxScore: Long,
    val maxLevel: Long
)
