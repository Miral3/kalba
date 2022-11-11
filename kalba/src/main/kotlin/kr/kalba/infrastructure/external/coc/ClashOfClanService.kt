package kr.kalba.infrastructure.external.coc

import kr.kalba.infrastructure.constant.Errors
import kr.kalba.infrastructure.exception.CommonException
import kr.kalba.infrastructure.external.coc.dto.ClanData
import kr.kalba.infrastructure.external.coc.dto.PlayerData
import kr.kalba.infrastructure.external.coc.dto.VerifyTokenRequest
import kr.kalba.infrastructure.external.coc.dto.VerifyTokenResponse
import kr.kalba.infrastructure.repository.StatisticRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.*
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.core.scheduler.Schedulers
import java.net.URI
import java.net.URLEncoder
import java.nio.charset.StandardCharsets


@Service
class ClashOfClanService(
    @Value("\${coc.token}")
    val token: String,
    val statisticRepository: StatisticRepository
) {
    fun test() {
        println(token)
        getClanInfo()
    }

    fun getClanInfo(): ClanData {
        try {
            val factory = HttpComponentsClientHttpRequestFactory()
            factory.setConnectTimeout(5000)
            factory.setReadTimeout(5000)
            val restTemplate = RestTemplate(factory)
            val header = HttpHeaders()
            header.setBearerAuth(token)
            header.add("Accept", "*/*")
            header.contentType = MediaType.APPLICATION_JSON
            val url = URI.create("https://api.clashofclans.com/v1/clans/%232Y2Y9YCUU")
            val res = restTemplate.exchange(
                url, HttpMethod.GET, HttpEntity<Any>(header),
                ClanData::class.java
            )
            if (res.statusCode.value() == 200) {
                return res.body!!
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        throw CommonException(Errors.COC_API_CLAN)
    }

    fun getUserInfo(userTag: String): PlayerData {
        try {
            val factory = HttpComponentsClientHttpRequestFactory()
            factory.setConnectTimeout(5000)
            factory.setReadTimeout(5000)
            val restTemplate = RestTemplate(factory)
            val header = HttpHeaders()
            header.setBearerAuth(token)
            header.add("Accept", "*/*")
            header.contentType = MediaType.APPLICATION_JSON
            val url =
                URI.create("https://api.clashofclans.com/v1/players/" + encodeUTF8(userTag))
            val res = restTemplate.exchange(
                url, HttpMethod.GET, HttpEntity<Any>(header),
                PlayerData::class.java
            )
            if (res.statusCode.value() == 200) {
                return res.body!!
            }

        } catch (e: Exception) {
            e.printStackTrace()
        }
        return PlayerData.of(
            statisticRepository.findById(userTag)
                .orElseThrow { CommonException(Errors.MONGO_MEMBER_STATISTIC_LOAD) }
        )
    }

    fun getUserInfoBulk(tags: List<String>): List<PlayerData> {
        return Flux.fromIterable(tags)
            .parallel()
            .runOn(Schedulers.boundedElastic())
            .flatMap { Mono.just(getUserInfo(it)) }
            .sequential()
            .collectList()
            .block()!!
    }

    fun verifyToken(tag: String, cocToken: String): VerifyTokenResponse {
        try {
            val factory = HttpComponentsClientHttpRequestFactory()
            factory.setConnectTimeout(5000)
            factory.setReadTimeout(5000)
            val restTemplate = RestTemplate(factory)
            val header = HttpHeaders()
            header.setBearerAuth(token)
            header.add("Accept", "*/*")
            header.contentType = MediaType.APPLICATION_JSON
            val url = URI.create("https://api.clashofclans.com/v1/players/${this.encodeUTF8(tag)}/verifytoken")
            val entity = HttpEntity<Any>(VerifyTokenRequest(cocToken), header)
            val res = restTemplate.postForEntity(url, entity, VerifyTokenResponse::class.java)
            if (res.statusCode.value() == 200) {
                return res.body!!
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        throw CommonException(Errors.COC_API_VERITY_USER_TOKEN)
    }

    fun encodeUTF8(userTag: String?): String {
        return URLEncoder.encode(userTag, StandardCharsets.UTF_8)
    }
}