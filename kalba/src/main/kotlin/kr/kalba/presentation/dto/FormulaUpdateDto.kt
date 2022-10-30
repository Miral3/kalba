package kr.kalba.presentation.dto

import kr.kalba.presentation.dto.meta.CommonMeta

class FormulaUpdateDto {

    class Request(
        val list: List<Data>
    ) : CommonMeta()

    class Data(
        val name: String,
        val korean: String,
        val value: Double,
        val maxScore: Long,
        val maxLevel: Long,
        val type: String
    )
}