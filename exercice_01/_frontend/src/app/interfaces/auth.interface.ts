export interface LoginForm {
  email: string;
  password: string;
}
export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role?: string;
}
export interface LoginResponse {
  access_token?: string;
}
export interface RegisterResponse {
  name: string,
  email: string,
  role: "user",
  profileImage: null,
  id: number
}
export interface LogoutResponse {
  message: string;
}

export interface JwtDecoded {
  user: {
    id: number,
    name: string,
    email: string,
    role: string,
    profileImage: null | string
    },
    iat: number,
    exp: number
  }
