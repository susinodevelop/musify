import UserEntity from "@/domain/entities/UserEntity";
import UserDto from "../model/UserDto";

export default class UserMapper {
  static toEntity = (user: UserDto): UserEntity => {
    return {
      id: user.id,
      name: user.name,
      profilePicture: user.profile_picture["1000x1000"],
    };
  };
}
