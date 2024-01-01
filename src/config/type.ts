export type AppConfig = {
  reactStrictMode?: boolean;
  server?: {
    development?: {
      port?: number
    },
    production?: {
      hosting?: HostingStrategy
    }
  }
  // More config options...
}

export type HostingStrategy = "vercel" | "netlify" | "heroku" | "custom";