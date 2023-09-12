import { UserRole } from './user.interface';
export declare class UserEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    profileImage: string;
    emailToLowerCase(): void;
}
