package kalba.util;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class MemberDataThread extends Thread {
    MemberDataManager memberDataManager;

    public void run() {
        try {
            String kalbaCode = "%232Y2Y9YCUU";
            memberDataManager.addClanTag(kalbaCode);
            while (true) {
                memberDataManager.updateAll();
                // 10min
                Thread.sleep(300000);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}