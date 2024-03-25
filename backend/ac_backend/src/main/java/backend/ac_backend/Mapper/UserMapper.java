package backend.ac_backend.Mapper;

import backend.ac_backend.Etnity.User;
import backend.ac_backend.UserDto.UserDto;

public class UserMapper {
    public static UserDto mapperToUserDTO(User user){

        return new UserDto(
                user.getID(),
                user.getName(),
                user.getEmail(),
                user.getPassword()
        );
    }
    public static User mapperToUser(UserDto userDto){

        return new User(
                userDto.getID(),
                userDto.getName(),
                userDto.getEmail(),
                userDto.getPassword()
        );
    }
}
