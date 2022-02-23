import { EUserRole } from "src/enums/EUserRole";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name:'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({example:'John Doe', required: true})
    @Column({
        type: 'varchar',
        nullable: false
    })
    full_name: string;

    @ApiProperty({example:'johnd@gmail.com', required: true})
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    email: string;

    @ApiProperty({example:'Test@2022', required: true})
    @Column({
        type: 'varchar',
        nullable: false,
        select: false
    })
    password: string;
   
    @ApiProperty({example:'CLIENT', required: true})
    @Column({
        type: 'enum',
        nullable: false,
        enum: EUserRole
    })
    role: EUserRole;

    @ApiProperty({example: 'https://cloudinary.com/smds/uploads/profiles/1d-eda.png', required: false})
    @Column({
        type: 'varchar',
        nullable: true,
    })
    avatar_url: string;

    @Column({
        type: 'boolean',
         default: false
    })
    is_verified: boolean

    @CreateDateColumn() createdAt?: Date;
    @UpdateDateColumn() updatedAt?: Date;
}