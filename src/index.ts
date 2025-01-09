import dotenv from "dotenv"
dotenv.config()

import {config} from "./config/index"

import { startApp } from "./app/app"

startApp(config)
