package kalba.controller;

import kalba.models.account.JwtRequest;
import kalba.models.account.JwtResponse;
import kalba.models.account.RegisterForm;
import kalba.models.account.Token;
import kalba.models.account.Account;
import kalba.service.AccountService;
import kalba.service.JwtUserDetailsService;
import kalba.util.JwtTokenUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/account")
@AllArgsConstructor
public class AccountController {
    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<Map<Object, Object>> register(@RequestBody RegisterForm registerForm) {
        Account account = Account.builder().nickname(registerForm.getNickname())
                .tag(registerForm.getTag())
                .name(registerForm.getName())
                .password(passwordEncoder.encode(registerForm.getPassword()))
                .role("USER")
                .build();
        int result = accountService.register(account);
        if (result != -1) {
            return ResponseEntity.created(URI.create("/account/" + account.getId())).body(Map.of("message", "success"));
        } else {
            return new ResponseEntity<>(Map.of("message", "존재하는 아이디입니다."), HttpStatus.CONFLICT);
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
}