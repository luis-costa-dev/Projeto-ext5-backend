import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    if (updateUserDto.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('E-mail já cadastrado');
      }
    }

    await this.usersRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);
  }

  // Generate and store a reset code (dev: returns code so UI can show it)
  async requestPasswordReset(email: string): Promise<{ success: boolean; code?: string }>{
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    user.resetCode = code;
    user.resetCodeExpiresAt = expiresAt;

    await this.usersRepository.save(user);

    // In production you'd send the code by email and not return it
    return { success: true, code };
  }

  async resetPassword(email: string, code: string, newPassword: string): Promise<{ success: boolean }>{
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!user.resetCode || !user.resetCodeExpiresAt) {
      throw new BadRequestException('Nenhum código de recuperação foi solicitado');
    }

    const now = new Date();
    if (user.resetCode !== code) {
      throw new BadRequestException('Código de verificação inválido');
    }

    if (user.resetCodeExpiresAt.getTime() < now.getTime()) {
      throw new BadRequestException('Código expirado');
    }

    user.password = newPassword;
    user.resetCode = null;
    user.resetCodeExpiresAt = null;

    await this.usersRepository.save(user);

    return { success: true };
  }
}
