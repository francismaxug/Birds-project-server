import { BirdServices } from "./bird"
import { IAppContext } from "../types/app"

export interface IServices {
  bird: BirdServices
}

export const startServices = async (query: IAppContext) => {
  try {
    const bird = new BirdServices(query)
    return { bird }
  } catch (error) {
    throw error
  }
}
