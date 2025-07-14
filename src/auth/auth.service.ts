import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: any) {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) throw new UnauthorizedException('Email already registered');
    const user = await this.usersService.create(data);
    return this.login(user);
  }
  async generateTokens(payload: any) {
  const [access_token, refresh_token] = await Promise.all([
    this.jwtService.signAsync(payload, { expiresIn: '15m' }),
    this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    }),
  ]);

  return { access_token, refresh_token };
}

}
