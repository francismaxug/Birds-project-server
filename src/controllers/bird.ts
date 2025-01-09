import { NextFunction, Request, Response } from "express"
import { IAppContext } from "../types/app"
import createError from "../utils/appError"
import { catchAsync } from "../utils/catchAsync"
import cloudinary from "../config/cloudinary"
import { sanitizeFilter } from "mongoose"

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext
  }
}

const createNewBird = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commonName, scientificName, description, habitat, appearance } =
      req.body
    const cleanHabitatArray = habitat
      ?.split(" ")
      ?.filter((item: string) => item !== "")

    const cleanColorsArray = JSON.parse(appearance)
      .colors?.split(" ")
      ?.filter((item: string) => item !== "")

    const appearanceObj = {
      size: JSON.parse(appearance).size,
      color: cleanColorsArray
    }

    const files = req.files?.photos

    if (!req.files) {
      const data = await req.context.services?.bird.createBird({
        commonName,
        scientificName,
        description,
        habitat: cleanHabitatArray,
        appearance: appearanceObj,
        photos: []
      })

      return res.status(200).json(data)
    }

    // Convert files to array if single file
    const imageFiles = files instanceof Array ? files : [files]
    console.log("Number of files to process:", imageFiles.length)

    const uploadResults = []

    for (const file of imageFiles) {
      try {
        console.log("Processing file:", {
          name: file?.name,
          size: file?.size,
          mimetype: file?.mimetype
        })

        // Ensure file data exists
        if (!file?.data) {
          console.error("File data is missing")
          continue
        }

        // Convert image to base64
        const imageData = file.data
        const mimetype = file.mimetype
        const tobase64 = imageData.toString("base64")

        // Log first 100 characters of base64 string to verify it's correct
        console.log("Base64 Preview:", tobase64.substring(0, 100))

        // Upload to Cloudinary
        const upload = await cloudinary.uploader.upload(
          `data:${mimetype};base64,${tobase64}`,
          {
            folder: "upci-church-uploads"
          }
        )

        console.log("Cloudinary upload success:", {
          url: upload.secure_url,
          publicId: upload.public_id
        })

        uploadResults.push(upload.secure_url)
      } catch (error) {
        console.error("Error processing file:")
        // You might want to add specific error handling here
      }
    }

    console.log("Upload Results:", uploadResults)

    // Save data to your service
    const data = await req.context.services?.bird.createBird({
      commonName,
      scientificName,
      description,
      habitat: cleanHabitatArray,
      appearance: appearanceObj,
      photos: uploadResults
    })

    console.log("Service Response:", data)
    return res.status(200).json(data)
  }
)

const getASingleBird = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.id
    const blog = await req.context.services?.bird.getSingleBird(blogId)

    return res.status(200).json(blog)
  }
)

const getAllBirds = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req)

    const allBlogs = await req.context.services?.bird.getAllBirds()

    return res.status(200).json(allBlogs)
  }
)

//---update-bird------------
const updateABird = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const birdId = req.params.id
    console.log(req.body)

    const cleanHabitatArray = req.body.habitat
      ?.split(" ")
      ?.filter((item: string) => item !== "")

    const cleanColorsArray = JSON.parse(req.body.appearance)
      .colors?.split(" ")
      ?.filter((item: string) => item !== "")

    const appearanceObj = {
      size: JSON.parse(req.body.appearance).size,
      color: cleanColorsArray
    }

    const updatedBird = await req.context.services?.bird.updateBird(birdId, {
      ...req.body,
      habitat: cleanHabitatArray,
      appearance: appearanceObj
    })

    return res.status(200).json(updatedBird)
  }
)

const deleteBird = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const birdId = req.params.id

    const deleteBird = await req.context.services?.bird.deleteBird(birdId)

    return res.status(200).json(deleteBird)
  }
)

export { createNewBird, getASingleBird, getAllBirds, updateABird, deleteBird }
