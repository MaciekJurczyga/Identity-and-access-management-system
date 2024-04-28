package backend.ac_backend.Config.auth;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.HashMap;

@Service
public class LoginAttemptService {

    private static final int MAX_ATTEMPTS = 3;
    private static final long LOCK_DURATION = 30 * 1000;

    private Map<String, Integer> attemptsMap = new HashMap<>();
    private Map<String, Long> lockExpiryMap = new HashMap<>();

    public void loginFailed(String username) {
        if(isAccountLocked(username)){
            return;
        }
        attemptsMap.put(username, attemptsMap.getOrDefault(username, 0) + 1);
        if (attemptsMap.get(username) + 1  >= MAX_ATTEMPTS) {
            lockExpiryMap.put(username, System.currentTimeMillis() + LOCK_DURATION);
        }

    }

    public void loginSucceeded(String username) {
        attemptsMap.remove(username);
        lockExpiryMap.remove(username);
    }

    public boolean isAccountLocked(String username) {
        if (lockExpiryMap.containsKey(username)) {
            long lockExpiry = lockExpiryMap.get(username);
            if (lockExpiry > System.currentTimeMillis()) {
                return true;
            } else {
                lockExpiryMap.remove(username);
                attemptsMap.remove(username);
            }
        }
        return false;
    }
}
