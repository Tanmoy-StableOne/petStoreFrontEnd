export interface LoginResponse {
  jwt: string;
  refreshToken: string;
  status: boolean;
  message: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface OtpRequest {
  email: string;
}

export interface OtpVerifyRequest {
  email: string;
  otp: string;
}

export interface ErrorResponse {
  errorMessage: string;
  details: string;
  errorCode: string;
  errorType: string;
  timeStamp: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
} 