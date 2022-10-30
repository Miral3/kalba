package kr.kalba.domain.mongo

import kr.kalba.presentation.dto.FormulaUpdateDto
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.MongoId

@Document("formula")
class Formula(
    @MongoId
    val name: String,
    val korean: String,
    val value: Double,
    val maxScore: Long,
    val maxLevel: Long,
    val type: String
) {
    companion object {
        fun of(formulaUpdateDto: FormulaUpdateDto.Data): Formula {
            return Formula(
                name = formulaUpdateDto.name,
                korean = formulaUpdateDto.korean,
                value = formulaUpdateDto.value,
                maxScore = formulaUpdateDto.maxScore,
                maxLevel = formulaUpdateDto.maxLevel,
                type = formulaUpdateDto.type
            )
        }
    }
}
