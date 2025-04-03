import { MICROSERVICE_NAME_FOR_PORT, MICROSERVICE_NAME } from "./Enums";

export const EndpointType = {
  prod: "www.google.com",
  dev: "http://localhost:"
};

export const MicroServiceEndpointType: Record<keyof typeof MICROSERVICE_NAME_FOR_PORT, string> = Object.keys(MICROSERVICE_NAME_FOR_PORT).reduce(
  (acc, key) => {
    const microServiceKey = key as keyof typeof MICROSERVICE_NAME_FOR_PORT;
    acc[microServiceKey] = `${EndpointType.dev}${MICROSERVICE_NAME_FOR_PORT[microServiceKey]}/`;
    return acc;
  },
  {} as Record<keyof typeof MICROSERVICE_NAME_FOR_PORT, string>
);


export function GetBaseURL(microServiceName: keyof typeof MicroServiceEndpointType): string {
  return MicroServiceEndpointType[microServiceName] || "";
}
