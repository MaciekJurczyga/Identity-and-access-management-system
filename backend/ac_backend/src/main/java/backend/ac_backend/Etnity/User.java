package backend.ac_backend.Etnity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Column(name = "Names")
    private String name;

    @Column(name = "Emails", nullable = false, unique = true)
    private String email;

    @Column(name = "Passwords")
    private String password;


    // Dodajemy nowe pole przechowujące treść wiadomości użytkownika
    @Column(name = "MessageContent")
    private String messageContent;


    @Enumerated(EnumType.STRING)
    private Role role;

    // Usuwamy pole przechowujące listę wiadomości, jeśli nie jest potrzebne w klasie User

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
