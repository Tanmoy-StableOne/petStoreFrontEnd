import { MICROSERVICE_NAME } from "../constants/Enums";

export interface CoreEndpoints {
  getNavbar: string;
  getProducts: string;
}

export interface AuthEndpoints {
  login: string;
  register: string;
  logout: string;
  refresh: string;
  getProfile: string;
}

export interface UserEndpoints {
  getProfile: string;
  updateProfile: string;
}

export interface AdminEndpoints {
  getDashboard: string;
  getUsers: string;
}

export interface ChatEndpoints {
  getMessages: string;
  sendMessage: string;
}

export interface PaymentEndpoints {
  createPayment: string;
  getPaymentStatus: string;
}

export interface S3Endpoints {
  uploadFile: string;
  getFile: string;
}

export interface SanctionEndpoints {
  checkStatus: string;
}

export interface SellerEndpoints {
  getProducts: string;
  addProduct: string;
}

export interface LivenessEndpoints {
  healthCheck: string;
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