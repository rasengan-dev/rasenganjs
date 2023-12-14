export type AppConfig = {
  reactStrictMode?: boolean;
  server?: {
    development?: {
      port?: number
    }
  }
  // More config options...
}