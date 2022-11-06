package kr.kalba.infrastructure.external.scheduler

import kr.kalba.application.ClanService
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class ClanDataUpdateScheduler(
    val clanService: ClanService
) {

    @Scheduled(fixedDelay = 300000)
    fun scheduleRunnableCreativeSelectJob() {
        clanService.updateClanInfo()
    }
}
