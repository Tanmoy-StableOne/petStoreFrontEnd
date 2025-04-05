import { MICROSERVICE_NAME } from "./Enums";
import { APIEndpoints } from "../interfaces/endpoint.interface";

export const EndpointType = {
  prod: "www.google.com",
  dev: "http://localhost:"
};

// Create a port mapping that uses MICROSERVICE_NAME values as keys
const PORT_MAPPING: Record<MICROSERVICE_NAME, number> = {
  [MICROSERVICE_NAME.ADMIN]: 8080,
  [MICROSERVICE_NAME.AUTHENTICATION]: 8081,
  [MICROSERVICE_NAME.CHAT]: 8082,
  [MICROSERVICE_NAME.CORE]: 8084,
  [MICROSERVICE_NAME.LIVENESS]: 8084,
  [MICROSERVICE_NAME.PAYMENT]: 8085,
  [MICROSERVICE_NAME.S3]: 8086,
  [MICROSERVICE_NAME.SANCTION]: 8087,
  [MICROSERVICE_NAME.SELLER]: 8088,
  [MICROSERVICE_NAME.USER]: 8089
};

// Define all API endpoints
export const Endpoints: APIEndpoints = {
  [MICROSERVICE_NAME.CORE]: {
    getNavbar: "navbar/get",
    getProducts: "products/all"
  },
  [MICROSERVICE_NAME.AUTHENTICATION]: {
    login: "auth/login",
    register: "auth/register",
    logout: "auth/logout",
    refresh: "auth/refresh"
  },
  [MICROSERVICE_NAME.USER]: {
    getProfile: "user/profile",
    updateProfile: "user/update"
  },
  [MICROSERVICE_NAME.ADMIN]: {
    getDashboard: "admin/dashboard",
    getUsers: "admin/users"
  },
  [MICROSERVICE_NAME.CHAT]: {
    getMessages: "chat/messages",
    sendMessage: "chat/send"
  },
  [MICROSERVICE_NAME.PAYMENT]: {
    createPayment: "payment/create",
    getPaymentStatus: "payment/status"
  },
  [MICROSERVICE_NAME.S3]: {
    uploadFile: "s3/upload",
    getFile: "s3/get"
  },
  [MICROSERVICE_NAME.SANCTION]: {
    checkStatus: "sanction/check"
  },
  [MICROSERVICE_NAME.SELLER]: {
    getProducts: "seller/products",
    addProduct: "seller/product/add"
  },
  [MICROSERVICE_NAME.LIVENESS]: {
    healthCheck: "health"
  }
};

/**
 * Gets the complete API endpoint URL for a specific microservice and endpoint
 * @param microServiceName The name of the microservice
 * @param endpointKey The specific endpoint key
 * @returns The complete API endpoint URL
 * @throws Error if the endpoint doesn't exist
 */
export function GetAPIEndpoint<T extends MICROSERVICE_NAME>(
  microServiceName: T,
  endpointKey: keyof APIEndpoints[T]
): string {
  const endpoints = Endpoints[microServiceName];
  const endpoint = endpoints[endpointKey as keyof typeof endpoints];

  if (!endpoint) {
    throw new Error(`API endpoint '${String(endpointKey)}' not found for microservice '${microServiceName}'`);
  }

  const port = PORT_MAPPING[microServiceName];
  return `${EndpointType.dev}${port}/${endpoint}`;
}
