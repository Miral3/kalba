package com.dealicious.tiquitaca.indexer.presentation.dto.meta

open class CommonMeta {

    var result: Result

    constructor() : this(Result.ok)

    constructor(result: Result) {
        this.result = result
    }

    enum class Result {
        ok, fail
    }
}