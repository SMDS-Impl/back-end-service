import { Module } from '@nestjs/common';
import { CustomResponseService } from './custom-response.service';

@Module({
  providers: [CustomResponseService]
})
export class CustomeResponseModule {}
