
export interface AuthTokenConfig {
  ApiUrl: string;
}

export interface User {
  alias: string;
  firstname: string;
  lastname: string;
  socialType: number;
  username: string;
}

export interface Account {
  id: string;
  name: string;
  description: string;
  numberOfUsers: number;
  status: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  accounts: Array<Account>;
}

export enum SocialType {
  None = 0,
  Facebook,
  Google,
}
