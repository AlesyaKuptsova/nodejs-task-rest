import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto): Promise<TokenDto> {
    const token = await this.authService.signToken(
      authDto.login,
      authDto.password
    );
    if (!token) {
      throw new ForbiddenException();
    }
    return { token };
  }
}
