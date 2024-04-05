package backend.ac_backend.UserController;


import backend.ac_backend.Config.JwtService;
import backend.ac_backend.Etnity.User;
import backend.ac_backend.Repository.Repository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RequiredArgsConstructor

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final JwtService jwtService;
    private final Repository userRepository;

    @GetMapping
    public ResponseEntity<Optional<User>> getUserInfo(@NonNull HttpServletRequest request) {
        try {
            final String authHeader = request.getHeader("Authorization");
            final String jwt;
            final String userEmail;
            jwt = authHeader.substring(7);
            userEmail = jwtService.extractUsername(jwt);

            // Pobranie dodatkowych informacji o użytkowniku na podstawie adresu e-mail
            Optional<User> user = userRepository.findByEmail(userEmail);

            if (user != null) {
                // Zwrócenie dodatkowych informacji o użytkowniku
                return ResponseEntity.ok(user);
            } else {
                // Obsługa przypadku, gdy użytkownik nie został znaleziony
                return ResponseEntity.status(404).body(null);
            }
        } catch (ExpiredJwtException e) {
            // Obsługa wyjątku wygaśnięcia tokenu JWT
            return ResponseEntity.status(403).body(null);
        } catch (Exception e) {
            // Obsługa innych wyjątków
            return ResponseEntity.status(500).body(null);
        }
    }
}
