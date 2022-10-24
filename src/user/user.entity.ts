import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsUserAlreadyExist } from "./is-unique-username";

export class User {
  @IsNotEmpty()
  @IsString()
  @IsUserAlreadyExist({
    message: 'userId must be unique'
  })
  userId: string;

  name: string;

  @IsEmail()
  email: string;

  @Exclude({
    toPlainOnly: true
  })
  @IsNotEmpty({
    message: 'you need inform password'
  })
  password: string;

  creationDate: Date;
}