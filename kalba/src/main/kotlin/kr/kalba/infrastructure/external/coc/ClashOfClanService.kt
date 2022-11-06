package kr.kalba.infrastructure.external.coc

import kr.kalba.infrastructure.constant.Errors
import kr.kalba.infrastructure.exception.CommonException
import kr.kalba.infrastructure.external.coc.dto.ClanData
import kr.kalba.infrastructure.external.coc.dto.PlayerData
import kr.kalba.infrastructure.external.coc.dto.VerifyTokenRequest
import kr.kalba.infrastructure.external.coc.dto.VerifyTokenResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory
import org.springframework.stereotype.Service
import org.springframework.web.client.HttpClientErrorException
import org.springframework.web.client.HttpServerErrorException
import org.springframework.web.client.RestTemplate
import java.net.URI
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

@Service
class ClashOfClanService(
    @Value("\${coc.token}")
    val token: String
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
        throw CommonException(Errors.COC_API_PLAYER)
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