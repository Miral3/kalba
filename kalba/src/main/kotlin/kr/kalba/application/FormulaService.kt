package kr.kalba.application

import kr.kalba.domain.mongo.Formula
import kr.kalba.infrastructure.repository.FormulaRepository
import kr.kalba.presentation.dto.FormulaUpdateDto
import org.springframework.stereotype.Service

@Service
class FormulaService(
    val formulaRepository: FormulaRepository
) {

    fun getFormula(): List<Formula> {
        return formulaRepository.findAll()
    }

    fun updateFormula(list: List<FormulaUpdateDto.Data>) {
        formulaRepository.saveAll(list.map { Formula.of(it) })
    }

    fun deleteFormula(list: List<FormulaUpdateDto.Data>) {
        formulaRepository.deleteAll(list.map { Formula.of(it) })
    }
}