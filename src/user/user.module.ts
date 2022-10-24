import { Module } from "@nestjs/common";
import { IsNameUniqueConstraint } from "./is-unique-username";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    IsNameUniqueConstraint
  ]
})
export class UserModule { }