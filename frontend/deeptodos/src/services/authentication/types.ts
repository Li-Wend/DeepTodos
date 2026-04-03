/**
 * 认证相关的类型定义
 */

export interface RegisterData {
  email: string;
  password: string;
  username?: string;
}

export interface RegisterResponse {
  id?: string;
  email: string;
  username?: string;
  [key: string]: any;
}
