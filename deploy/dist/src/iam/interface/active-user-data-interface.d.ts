import { Role } from '../../users/enums/role.enum';
export interface ActiveUserData {
    sub: number;
    email: string;
    role: Role;
}
export interface RefreshTokenPayload {
    sub: number;
    email: string;
    refreshTokenId: string;
}
