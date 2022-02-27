import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";
import { EMaterialStatus } from "src/enums/EMaterialStatus";
import { EMaterialType } from "src/enums/EMaterialType";
import { EUserRole } from "src/enums/EUserRole";

export class CreateMaterialDto {
    @ApiProperty({example: "Multi Sockets",required: true})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: "28",required: true})
    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({example:EMaterialType.MULTI_SOCKET, required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(EMaterialType)
    type: EMaterialType;

    @ApiProperty({example:EMaterialStatus.NEW, required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(EMaterialStatus)
    status: EMaterialStatus;
}
