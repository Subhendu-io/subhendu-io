import axios, { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: "BASE_URL",
  timeout: 50000,
});

client.interceptors.request.use(
  (config: any) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Strict-Transport-Security"] =
      "max-age=63072000; includeSubDomains; preload";
    config.headers["X-Frame-Options"] = "SAMEORIGIN";
    config.headers["X-Content-Type-Options"] = "nosniff";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Headers"] =
      "Origin, Content-Security-Policy, Content-Type, Accept, Authorization, access-control-allow-origin,X-Content-Type-Options,Strict-Transport-Security,X-Frame-Options";
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default client;
