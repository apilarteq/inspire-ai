export interface FormData {
  username: string;
  password: string;
}

export interface LoginFormData extends FormData {
  remember: boolean;
}

export interface RegisterFormData extends FormData {
  terms: boolean;
}

export interface AuthResponse {
  success?: boolean;
  error?: string;
}
