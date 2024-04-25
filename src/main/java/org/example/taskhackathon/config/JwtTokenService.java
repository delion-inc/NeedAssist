package org.example.taskhackathon.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletResponse;
import org.example.taskhackathon.entity.constant.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JwtTokenService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.accessToken.lifetime}")
    private Duration jwtAccessTokenLifetime;

    @Value("${jwt.refreshToken.lifetime}")
    private Duration jwtRefreshTokenLifetime;

    public String getEmail(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }

    public List<Role> getRoles(String token) {
        List<String> roleStrings = getAllClaimsFromToken(token).get("roles", List.class);
        return roleStrings.stream().map(Role::valueOf).collect(Collectors.toList());
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    public String getToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public String generateToken(UserDetails userDetails) {
        return generateJwt(userDetails, jwtAccessTokenLifetime);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateJwt(userDetails, jwtRefreshTokenLifetime);
    }

    public void setTokenCookies(HttpServletResponse response, String refreshToken) {
        String cookieValue = String.format("jwt=%s; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=%s", refreshToken, 24 * 60 * 60);
        response.setHeader("Set-Cookie", cookieValue);
    }

    private String generateJwt(UserDetails userDetails, Duration lifetime) {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");

        Map<String, Object> claims = new HashMap<>();
        List<Role> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .map(Role::valueOf)
                .collect(Collectors.toList());
        claims.put("roles", roles);

        Date issuedDate = new Date();
        Date expiredDate = new Date(issuedDate.getTime() + lifetime.toMillis());
        return Jwts.builder()
                .setHeader(header)
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(issuedDate)
                .setExpiration(expiredDate)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }
}
