import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserEntity } from 'src/modules/user/users.entity';
import { EUserRole } from 'src/enums/EUserRole';
import { hashPassword } from 'src/helpers/hash';

export default class CreateAdmin implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        try {
            const user = await connection
                .createQueryBuilder()
                .select()
                .from(UserEntity, 'users')
                .where('"users"."email" = :email', {
                    email: 'smdsAdmin@gmail.com',
                })
                .getOne();

            if (!user) {
                const newUser = await connection
                    .createQueryBuilder()
                    .insert()
                    .into(UserEntity)
                    .values([
                        {
                            full_name: 'Admin',
                            email: 'smdsAdmin@gmail.com',
                            role: EUserRole.ADMIN,
                            password: await hashPassword('Admin@2022'),
                            is_verified: true,
                        },
                    ])
                    .execute();
                console.log(newUser);
            }
        } catch (error) {
            console.log('error: ');
            console.log(error);
        }
    }
}
