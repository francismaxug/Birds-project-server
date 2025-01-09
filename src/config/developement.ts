import dotenv from "dotenv"
import { Config } from "."
dotenv.config()
export const devConfig: Config = {
  initApp: {
    port: Number(process.env.PORT) || 8080,
    name: "Birds API",
    env: "development"
  },
  dbString: {
    uri: process.env.MONGO_URI!
  }
}
