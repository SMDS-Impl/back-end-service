import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/shared/dtos/response.dto';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { MaterialEntity } from './material.entity';
import { MaterialService } from './material.service';

@Controller('materials')
@ApiTags("Materials")
export class MaterialController {
    constructor(
        private readonly materialService: MaterialService
    ){}
    /*
     @role saves a new material
     @param CreateMaterialDTO
     @return Material
     @endpoint /api/v1/material
    */
    @Post('/')
    @HttpCode(201)
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiOkResponse({type: MaterialEntity, description: "New Material payload"})
    public async save(
        @Body() CreateMaterialDto: CreateMaterialDto
    ): Promise<ResponseEntity>{
        return await this.materialService.save(CreateMaterialDto);
    }
}
