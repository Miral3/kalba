package kr.kalba.presentation.dto

import kr.kalba.presentation.dto.meta.CommonMeta
import kr.kalba.domain.mongo.Formula

class FormulaReadDto {

    class Response(
        val formula: List<Data>
    ) : CommonMeta()

    class Data(
        val name: String,
        val korean: String,
        val value: Double,
        val maxScore: Long,
        val maxLevel: Long,
        val type: String
    ) {
        companion object {
            fun of(formula: Formula): Data {
                return Data(
                    name = formula.name,
                    korean = formula.korean,
                    value = formula.value,
                    maxScore = formula.maxScore,
                    maxLevel = formula.maxLevel,
                    type = formula.type
                )
            }
        }
    }
}