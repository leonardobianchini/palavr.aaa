import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class UserService {

  private users: Array<User> = [];

  public create(user: User): User {
    this.users.push(user);

    return user;
  }

  public findUser(userName: string): User {
    return this.users.find(user => user.name = userName);
  }

  public getAllUsers(): Array<User> {
    return this.users;
  }
}