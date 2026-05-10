import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role || 'customer',
    });


    const savedUser = await this.userRepo.save(user);

    const { password, ...result } = savedUser;

    return {
      message: 'User created successfully',
      user: result,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      access_token: token,
    };
  }

  async findMe(userId: number) {
    return this.userRepo.findOne({
      where: { id: userId },
      select: ['id', 'name', 'email', 'role'],
    });
  }
}