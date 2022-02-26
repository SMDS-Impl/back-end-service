import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { EUserRole } from "src/enums/EUserRole";
import { Column } from "typeorm";

export class CreateUserDto {
    @ApiProperty({example: "John",required: true})
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({example: "johndoe@gmail.com",required: true})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: "Test@2022",required: true})
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @ApiProperty({example:"https://cloudinary.com/smds/uploads/profiles/1d-eda.png", required: false})
    @IsOptional()
    @IsString()
    avatar_url: string;

    @ApiProperty({example:EUserRole.SCHOOL_ACCOUNTANT, required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum({enum: EUserRole})
    @Column({type:'enum', enum: EUserRole, default: EUserRole.SCHOOL_ACCOUNTANT})
    role: EUserRole;
}