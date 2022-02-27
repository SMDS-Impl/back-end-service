import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomResponseService } from 'src/utils/custome-response/custom-response.service';
import { MaterialEntity } from './material.entity';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialEntity]),
  ],
  providers: [MaterialService, CustomResponseService],
  controllers: [MaterialController]
})
export class MaterialModule {}