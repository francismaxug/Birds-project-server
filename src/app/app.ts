import express from "express"
import { Request, Response, NextFunction } from "express-serve-static-core"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import connectDB from "../models"
import fileUpload from "express-fileupload"

import cors from "cors"
import { Config } from "../config/index"
import { IAppContext } from "../types/app"
import { startServices } from "../services"
import handleError from "../middleware/customError"
import birdRoute from "../routes/bird"
export const app = express()

export const startApp = async (config: Config) => {
  try {
    const appContext: IAppContext = {}
    appContext.queryDB = await connectDB(config.dbString)

    appContext.services = await startServices(appContext)

    // const corsOptions = {
    //   origin:
    //     process.env.NODE_ENV === "development"
    //       ? "http://localhost:3000"
    //       : "https://upci-church-app.vercel.app",
    //   credentials: true
    // }
    if (process.env.NODE_ENV === "development") {
      app.use(morgan("dev"))
    }
    app.use(cors())
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use((req: Request, res: Response, next: NextFunction) => {
      (req as Request & { context?: IAppContext }).context = appContext
      next()
    })
    app.use(fileUpload({}))
    app.use("/api/v1/bird", birdRoute)
    app.use(handleError)
    app.all("*", (req, res) => {
      res.status(404).json({
        status: "failed",
        message: `Can't find ${req.originalUrl} on this server`
      })
    })
  } catch (error) {
    throw error
  }

  app.listen(config.initApp.port, () => {
    console.log(`Server is running on port ${config.initApp.port}`)
  })
}
