import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterDto } from './dto/register.dto';
import { CreatedUser } from './interfaces/created-user.interface';
import type { User } from '../../generated/prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: RegisterDto): Promise<CreatedUser | null> {
    return await this.prisma.user.create({
      data,
      select: {
        email: true,
        username: true,
        createdAt: true,
        role: true,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
