package backend.ac_backend.Config;

import backend.ac_backend.Config.auth.AwsKmsClient;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;



@Service
@RequiredArgsConstructor
public class JwtService {

    private static final String CIPHERED_BLOB = "AQICAHiQrMsWrc/jR1AQjlyVusn3X7aE7ubJFjFNaeviyRODMgGHS9zY9KkYQSqtwfke1Pf0AAAAwjCBvwYJKoZIhvcNAQcGoIGxMIGuAgEAMIGoBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDHd+b6kWJD5pf5DI0AIBEIB7YYMamTXtucMH68FCsNu7jL4+18MSaqNajsFqOEjXXijZe4NrGbpeF7sKcBOPWUebsC/IZafvxqZXlNuoZxSqxHLRCmxgdP/56eZLpcuYglmHU2CUCXx9HTgc+AUbef+6oZzXdMQ1ahibO5nlokIASwJmymVEm/puqv4i";

    private final AwsKmsClient awsKmsClient;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims =extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails

    ){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*10))
                .signWith(getSiginKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSiginKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

    }

    private Key getSiginKey() {
        byte[] keyBytes = Decoders.BASE64.decode(awsKmsClient.decrypt(CIPHERED_BLOB));
        return Keys.hmacShaKeyFor(keyBytes);
    }

}