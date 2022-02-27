import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseEntity } from 'src/shared/dtos/response.dto';
import { EResponseType } from 'src/shared/enums/EResponseType';
import { CustomResponseService } from 'src/utils/custom-response/custom-response.service';
import { Repository } from 'typeorm';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { MaterialEntity } from './material.entity';

const {SUCCESS} = EResponseType;
@Injectable()
export class MaterialService {
    constructor(
        @InjectRepository(MaterialEntity)
        private readonly materialRepository: Repository<MaterialEntity>,
        private readonly responseService: CustomResponseService
    ){}

    /*
     @role saves a new material
     @param CreateMaterialDto
     @return ResponseEntity
    */
    public async save(createMaterialDto: CreateMaterialDto) : Promise<ResponseEntity> {
        const {name} = createMaterialDto;

        const existsByName: MaterialEntity | false = await this._findOneByName(name);
        if(existsByName) throw new HttpException(`Material with name [${name}] already exists`, HttpStatus.BAD_REQUEST);
        
        const material = await this.materialRepository.save(createMaterialDto);    

        const response: ResponseEntity = this.responseService.makeResponse(
            "Successfully registered new material",
            201,
            material,
            SUCCESS
        );
        return response;
    }

     /*
     @role finds by name
     @param name
     @return Material or false for not found
    */
    private async _findOneByName(name: string): Promise<MaterialEntity | false>{
      try{
        const material: MaterialEntity = await this.materialRepository.findOne({where: {name}});
        if(material) return material;
        return false;
      }
      catch(e){
          return false;
      }
    }
}
