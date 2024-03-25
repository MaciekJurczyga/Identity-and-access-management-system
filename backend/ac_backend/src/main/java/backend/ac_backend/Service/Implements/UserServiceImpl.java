package backend.ac_backend.Service.Implements;

import backend.ac_backend.Etnity.User;
import backend.ac_backend.Mapper.UserMapper;
import backend.ac_backend.Repository.Repository;
import backend.ac_backend.Service.Service;
import backend.ac_backend.UserDto.UserDto;

@org.springframework.stereotype.Service
public class UserServiceImpl implements Service {
    private Repository repository;
    public UserServiceImpl(Repository repository){
        this.repository = repository;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapperToUser(userDto);
        User savedUser = repository.save(user);

        return UserMapper.mapperToUserDTO(savedUser);
    }
}
