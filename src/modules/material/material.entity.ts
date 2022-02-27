import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { EMaterialType } from "src/enums/EMaterialType";
import { EMaterialStatus } from "src/enums/EMaterialStatus";

@Entity({name:'materials'})
export class MaterialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example: "Multi Sockets",required: true})
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    name: string;

    @ApiProperty({example: "28",required: true})
    @Column({
        type: 'int',
        nullable: false
    })
    quantity: number;
   
    @ApiProperty({example:EMaterialType.MULTI_SOCKET, required: false})
    @Column({
        type: 'enum',
        nullable: false,
        enum: EMaterialType
    })
    type: EMaterialType;

    @ApiProperty({example:EMaterialStatus.NEW, required: false})
    @Column({
        type: 'enum',
        nullable: false,
        enum: EMaterialStatus
    })
    status: EMaterialStatus;

    @CreateDateColumn() createdAt?: Date;
    @UpdateDateColumn() updatedAt?: Date;

}