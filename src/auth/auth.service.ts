import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Maybe } from '../common/util';
import { User as DBUser } from '../entity/user';

import { config } from '../common/config';

@Injectable()
export class AuthService {
  async signToken(login: string, password: string): Promise<Maybe<string>> {
    if (!login || !password) {
      return undefined;
    }
    const user = await DBUser.findOne({ login });
    if (user) {
      if (bcrypt.compareSync(password, user.passwordHash)) {
        const payload = { sub: user.id, login };
        const token = jwt.sign(payload, config.JWT_SECRET_KEY, {
          expiresIn: 10000,
        });
        return token;
      }
    }
    return undefined;
  }

  checkToken(token: string): boolean {
    try {
      jwt.verify(token, config.JWT_SECRET_KEY);
      return true;
    } catch (err) {
      return false;
    }
  }
}
