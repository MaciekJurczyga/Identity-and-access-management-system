package backend.ac_backend.Etnity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    @Column(name = "Names")
    private String name;
    @Column(name = "Emails", nullable = false, unique = true)
    private String email;
    @Column(name = "Passwords")
    private String password;

}
