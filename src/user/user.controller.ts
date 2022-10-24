import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { NestResponse } from "../core/http/nest-response";
import { NestResponseBuilder } from "../core/http/nest-response-builder";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

  constructor(private userService: UserService) { }

  @Get()
  public getAll(): Array<User> {
    return this.userService.getAllUsers();
  }

  @Get(':userName')
  public findUser(@Param('userName') userName: string): User {
    const response = this.userService.findUser(userName);

    if(!response) throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'UserName not Found!'
    });
    return response;
  }

  @Post()
  public create(@Body() user: User): NestResponse {
    const newUser = this.userService.create(user);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        'Location': `/users/${newUser.userId}`
      })
      .withBody(newUser)
      .build();
  }
}