import { MICROSERVICE_NAME } from "../constants/Enums";

export type APIEndpoint = string;

export interface CoreEndpoints {
  base: APIEndpoint;
  getNavbar: APIEndpoint;
  getProducts: APIEndpoint;
}

export interface AuthEndpoints {
  base: APIEndpoint;
  login: APIEndpoint;
  register: APIEndpoint;
  logout: APIEndpoint;
  refresh: APIEndpoint;
}

export interface UserEndpoints {
  base: APIEndpoint;
  getProfile: APIEndpoint;
  updateProfile: APIEndpoint;
}

export interface AdminEndpoints {
  base: APIEndpoint;
  getDashboard: APIEndpoint;
  getUsers: APIEndpoint;
}

export interface ChatEndpoints {
  base: APIEndpoint;
  getMessages: APIEndpoint;
  sendMessage: APIEndpoint;
}

export interface PaymentEndpoints {
  base: APIEndpoint;
  createPayment: APIEndpoint;
  getPaymentStatus: APIEndpoint;
}

export interface S3Endpoints {
  base: APIEndpoint;
  uploadFile: APIEndpoint;
  getFile: APIEndpoint;
}

export interface SanctionEndpoints {
  base: APIEndpoint;
  checkStatus: APIEndpoint;
}

export interface SellerEndpoints {
  base: APIEndpoint;
  getProducts: APIEndpoint;
  addProduct: APIEndpoint;
}

export interface LivenessEndpoints {
  base: APIEndpoint;
  healthCheck: APIEndpoint;
}

export interface APIEndpoints {
  [MICROSERVICE_NAME.CORE]: CoreEndpoints;
  [MICROSERVICE_NAME.AUTHENTICATION]: AuthEndpoints;
  [MICROSERVICE_NAME.USER]: UserEndpoints;
  [MICROSERVICE_NAME.ADMIN]: AdminEndpoints;
  [MICROSERVICE_NAME.CHAT]: ChatEndpoints;
  [MICROSERVICE_NAME.PAYMENT]: PaymentEndpoints;
  [MICROSERVICE_NAME.S3]: S3Endpoints;
  [MICROSERVICE_NAME.SANCTION]: SanctionEndpoints;
  [MICROSERVICE_NAME.SELLER]: SellerEndpoints;
  [MICROSERVICE_NAME.LIVENESS]: LivenessEndpoints;
} 