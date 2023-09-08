export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'selller',
  USER = 'user'
};

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profileImage?: string;
};
