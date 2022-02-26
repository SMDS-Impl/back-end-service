import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { EUserRole } from "src/enums/EUserRole";

export class UpdateUserDto {
    @ApiProperty({example: "John",required: false})
    @IsString()
    @IsOptional()
    full_name: string;

    @ApiProperty({example: "johndoe@gmail.com",required: false})
    @IsString()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({example:"https://cloudinary.com/smds/uploads/profiles/1d-eda.png", required: false})
    @IsOptional()
    @IsString()
    avatar_url: string;

    @ApiProperty({example:EUserRole.SCHOOL_ACCOUNTANT, required: true})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(EUserRole)
    role: EUserRole;
}