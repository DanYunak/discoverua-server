import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) { }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.getUsers()
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto

        const user = await this.usersRepository.findOneBy({ username })

        const isPasswordEquals = await bcrypt.compare(password, user.password)

        if (user && isPasswordEquals) {
            const payload: JwtPayload = { username }
            const accessToken: string = await this.jwtService.sign(payload)
            return { accessToken }
        } else {
            throw new UnauthorizedException('Please check your login credentials')
        }
    }
}
