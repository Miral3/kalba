package kr.kalba.application

import kr.kalba.domain.FormulaType
import kr.kalba.domain.mongo.Formula
import kr.kalba.infrastructure.repository.FormulaRepository
import kr.kalba.presentation.dto.FormulaUpdateDto
import org.springframework.stereotype.Service
import org.springframework.util.ObjectUtils

@Service
class FormulaService(
    val formulaRepository: FormulaRepository
) {

    fun getFormulaByType(type: FormulaType?): List<Formula> {
        return if (ObjectUtils.isEmpty(type) || type == FormulaType.ALL) {
            formulaRepository.findAll()
        } else {
            formulaRepository.findByType(type!!.type)
        }
    }

    fun updateFormula(list: List<FormulaUpdateDto.Data>, type: FormulaType?) {
        val beforeFormulas = if (ObjectUtils.isEmpty(type) || type == FormulaType.ALL) {
            formulaRepository.findAll()
        } else {
            formulaRepository.findByType(type!!.type)
        }.associateBy { it.name }

        val updateTarget = list.map { Formula.of(it) }
        val deleteTarget = updateTarget.filterNot { beforeFormulas.containsKey(it.name) }

        formulaRepository.deleteAll(deleteTarget)
        formulaRepository.saveAll(updateTarget)
    }

    fun deleteFormula(list: List<FormulaUpdateDto.Data>) {
        formulaRepository.deleteAll(list.map { Formula.of(it) })
    }
}