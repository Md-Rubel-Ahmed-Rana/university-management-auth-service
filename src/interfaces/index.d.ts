import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    // eslint-disable-next-line
    interface Request {
      user: JwtPayload | null;
    }
  }
}
