import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { UsersRepository } from './users.repository';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        // JwtModule.register({
        //     secret: 'secretKey',
        //     signOptions: {
        //         expiresIn: 3600 // 1 hour
        //     }
        // })
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
              return {
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                  expiresIn: 3600 // 1 hour
                }
              }
            }
          })
    ],
    providers: [AuthService, UsersRepository, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
