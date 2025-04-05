import { MICROSERVICE_NAME } from "../constants/Enums";

export type APIEndpoint = string;

export interface CoreEndpoints {
  getNavbar: APIEndpoint;
  getProducts: APIEndpoint;
}

export interface AuthEndpoints {
  login: APIEndpoint;
  register: APIEndpoint;
  logout: APIEndpoint;
  refresh: APIEndpoint;
}

export interface UserEndpoints {
  getProfile: APIEndpoint;
  updateProfile: APIEndpoint;
}

export interface AdminEndpoints {
  getDashboard: APIEndpoint;
  getUsers: APIEndpoint;
}

export interface ChatEndpoints {
  getMessages: APIEndpoint;
  sendMessage: APIEndpoint;
}

export interface PaymentEndpoints {
  createPayment: APIEndpoint;
  getPaymentStatus: APIEndpoint;
}

export interface S3Endpoints {
  uploadFile: APIEndpoint;
  getFile: APIEndpoint;
}

export interface SanctionEndpoints {
  checkStatus: APIEndpoint;
}

export interface SellerEndpoints {
  getProducts: APIEndpoint;
  addProduct: APIEndpoint;
}

export interface LivenessEndpoints {
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