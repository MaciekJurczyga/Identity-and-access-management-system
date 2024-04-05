package backend.ac_backend.UserController;



import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @CrossOrigin("*")
    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("hello");
    }

    @CrossOrigin("*")
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptionsRequest() {
        return ResponseEntity.ok().allow(HttpMethod.GET, HttpMethod.OPTIONS).build();
    }
}
