export interface User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    profileImage?: string;
}
export declare enum UserRole {
    ADMIN = "admin",
    SELLER = "seller",
    USER = "user"
}
export interface File {
    profileImage: string;
}
