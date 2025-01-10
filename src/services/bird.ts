import { Types } from "mongoose"
import cloudinary from "../config/cloudinary"

import { IAppContext, InitAdmin } from "../types/app"
import createError from "../utils/appError"
import { IBird, IBirdSchema } from "../types/bird"

export class BirdServices extends InitAdmin {
  constructor(context: IAppContext) {
    super(context)
  }

  createBird = async (input: IBird) => {
    try {
      await this.queryDB.birdModel.create(input)

      return {
        status: "success",
        message: "Bird created successfully"
      }
    } catch (err) {
      throw err
    }
  }

  getSingleBird = async (birdId: string) => {
    try {
      const bird = await this.queryDB.birdModel.findById(birdId)
      if (!bird) {
        throw createError("Bird  not found", 404)
      }

      return bird
    } catch (err) {
      throw err
    }
  }

  getAllBirds = async () => {
    try {
      const birds = await this.queryDB.birdModel.find({})
      // console.log("bird", birds)

      return birds
    } catch (error) {
      throw error
    }
  }

  updateBird = async (birdId: string, input: IBird) => {
    try {
      const bird = await this.queryDB.birdModel.findById(birdId)
      if (!bird) {
        throw createError("Bird not found", 404)
      }

      await this.queryDB.birdModel.findByIdAndUpdate(
        birdId,
        {
          ...input
        },
        { new: true }
      )

      return {
        status: "success",
        message: "Bird updated successfully"
      }
    } catch (err) {
      throw err
    }
  }

  deleteBird = async (birdId: string) => {
    try {
      const bird = await this.queryDB.birdModel.findById(birdId)
      console.log("bird", bird)
      if (!bird) {
        throw createError("Error deleting bird", 404)
      }

      await this.queryDB.birdModel.findByIdAndDelete(birdId)
      return {
        status: "success",
        message: "Bird deleted successfully"
      }
    } catch (err) {
      throw err
    }
  }
}
