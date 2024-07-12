export interface ILoginResponse {
  accessToken: string;
  expiresIn: number
}

export interface IResponse<T> {
  data: T;
}

export interface IUser {
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorities?: IAuthority[];
}

export interface ICategoria {
  id?: number;
  nombre?: string;
  descripcion?: string;
}

export interface IProducto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  cantidadEnStock?: number;
  categoria: ICategoria; 
}

export interface IAuthority {
  authority: string;
}

export interface IFeedBackMessage {
  type?: IFeedbackStatus;
  message?: string;
}

export enum IFeedbackStatus {
  success = "SUCCESS",
  error = "ERROR",
  default = ''
}

export enum IRole {
  user = "ROLE_USER",
  superAdmin = 'ROLE_SUPER_ADMIN'
}