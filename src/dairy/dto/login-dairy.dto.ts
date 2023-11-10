import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDairyDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    name: string;

   @IsNotEmpty()
   @IsString()
   code: number;

}