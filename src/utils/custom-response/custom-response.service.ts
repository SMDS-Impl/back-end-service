import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { EResponseType } from 'src/shared/enums/EResponseType';
import { ResponseEntity } from 'src/shared/dtos/response.dto';
import 'dotenv/config';

@Injectable({ scope: Scope.REQUEST })
export class CustomResponseService {
    constructor(@Inject(REQUEST) private readonly request: Request) {
    }
    public makeResponse(message: string, statusCode: number, data: any, responseType: EResponseType): ResponseEntity {
        const { route, method } = this.request;
        const responseDto: ResponseEntity = {
            success: (responseType == EResponseType.SUCCESS) ? true : false,
            statusCode: statusCode,
            message: message,
            data: data,
            path: route.path,
            method
        }
        return responseDto;
    }
}
