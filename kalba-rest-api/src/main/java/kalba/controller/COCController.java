package kalba.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class COCController {
    @RequestMapping("/")
    public String helloKalba() {
        return "hello";
    }
}