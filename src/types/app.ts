import { IInitDB } from "../models/initialize"
import { IServices } from "../services"
import { IBirdModel } from "./bird"

export interface IAppContext {
  queryDB?: IInitDB
  services?: IServices
}
export class InitAdmin {
  queryDB: IInitDB
  constructor(query: IAppContext) {
    this.queryDB = query.queryDB!
  }
}
