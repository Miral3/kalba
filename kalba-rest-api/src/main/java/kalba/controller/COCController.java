package kalba.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class COCController {
    @RequestMapping("/")
    public String yongBrothers() {
        return "yongsang ♥ yongha";
    }
}