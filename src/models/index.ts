import mongoose from "mongoose"
import dotenv from "dotenv"
import { Config } from "../config/index"
import { IInitDB } from "./initialize"
import Birds from "./bird"
dotenv.config()
let connected = false
const connectDB = async (db: Config["dbString"]): Promise<IInitDB> => {
  // console.log(db)
  try {
    await mongoose.connect(db.uri || "")
    connected = true

    console.log(`MongoDB Connected`)
    await Birds.createCollection()

    return {
      birdModel: Birds
    }
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`)
    process.exit(1)
  }
}

export default connectDB
