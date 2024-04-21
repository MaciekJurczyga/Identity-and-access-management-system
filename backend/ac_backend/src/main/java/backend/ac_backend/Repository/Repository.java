package backend.ac_backend.Repository;

import backend.ac_backend.Etnity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@org.springframework.stereotype.Repository
public interface Repository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
 }
