import dotenv from "dotenv"
import { Config } from "."

dotenv.config()

export const prodConfig: Config = {
  initApp: {
    port: Number(process.env.PORT) || 8080,
    name: "Birds API",
    env: "production"
  },
  dbString: {
    uri: process.env.MONGO_URI!
  }
}
