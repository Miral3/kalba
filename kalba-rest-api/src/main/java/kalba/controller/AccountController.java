package kalba.controller;

import kalba.models.account.*;
import kalba.repository.JpaAccountRepository;
import kalba.service.AccountService;
import kalba.service.JwtUserDetailsService;
import kalba.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
public class AccountController {
    private static final String NOT_EXIST_USER = "존재하는 아이디입니다.";

    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailsService userDetailsService;

    private final JpaAccountRepository jpaAccountRepository;

    @PostMapping("/register")
    public ResponseEntity<Map<Object, Object>> register(@RequestBody RegisterForm registerForm) {
        Account account = Account.builder().nickname(registerForm.getNickname())
                .tag(registerForm.getTag())
                .name(registerForm.getName())
                .password(passwordEncoder.encode(registerForm.getPassword()))
                .role("USER")
                .build();
        int result = accountService.register(account);
        if (result > 0) {
            return ResponseEntity.created(URI.create("/account/" + account.getId())).body(Map.of("message", "success"));
        } else {
            String msg;
            if (result == -1) {
                msg = NOT_EXIST_USER;
            } else if (result == -2) {
                msg = "해당 태그로 가입된 아이디가 존재합니다.";
            } else {
                msg = "예상하지 못한 에러가 발생하였습니다.";
            }
            return new ResponseEntity<>(Map.of("message", msg), HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (DisabledException e) {
            return new ResponseEntity<>(Map.of("message", "disable user"), HttpStatus.UNAUTHORIZED);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(Map.of("message", "invalid credentials"), HttpStatus.UNAUTHORIZED);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping("/login/name")
    public ResponseEntity<?> getUserNameFromToken(@RequestBody Token token) {
        return ResponseEntity.ok(Map.of("name", jwtTokenUtil.getUsernameFromToken(token.getToken())));
    }

    @PostMapping("/login/tag")
    public ResponseEntity<?> getTagByName(@RequestBody Name name) {
        return accountService.findAccountByName(name.getName())
                .<ResponseEntity<?>>map(account -> ResponseEntity.ok(Map.of("tag", account.getTag())))
                .orElseGet(() -> ResponseEntity.ok(Map.of("message", "invalid name")));
    }

    @PostMapping("/info")
    public ResponseEntity<?> getAccountInfoByName(@RequestBody Name name) {
        return accountService.findAccountInfoByName(name.getName())
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.ok(Map.of("message", "invalid name")));
    }

    @GetMapping("/info/all")
    public ResponseEntity<?> getAllAccountInfo() {
        return ResponseEntity.ok(accountService.findAllAccountInfo());
    }

    @GetMapping("/admin")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> isAdmin() {
        return ResponseEntity.ok(Map.of("isAdmin", jpaAccountRepository.findById()));
    }
}