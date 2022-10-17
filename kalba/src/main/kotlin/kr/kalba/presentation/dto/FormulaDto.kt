package kr.kalba.presentation.dto

class FormulaDto {
    class Request(
        val heroes: List<Data>,
        val pets: List<Data>,
        val siegeMachines: List<Data>,
        val spells: List<Data>,
        val units: List<Data>
    )

    class Response(
        val heroes: List<Data>,
        val pets: List<Data>,
        val siegeMachines: List<Data>,
        val spells: List<Data>,
        val units: List<Data>
    )

    class Data(
        val english: String,
        val index: Int,
        val korean: String,
        val maxLevel: Int,
        val maxScore: Int,
        val value: Double
    )
}