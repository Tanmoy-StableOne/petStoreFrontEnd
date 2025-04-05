import { MICROSERVICE_NAME } from "./Enums";

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

export function GetBaseURL(microServiceName: MICROSERVICE_NAME): string {
  const port = PORT_MAPPING[microServiceName];
  return `${EndpointType.dev}${port}/`;
}
