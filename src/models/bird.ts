import { model, models, Schema } from "mongoose"
import { IBirdModel, IBirdSchema } from "../types/bird"

const birdSchema = new Schema<IBirdSchema>(
  {
    commonName: {
      type: String,
      required: true,
      unique: true
    },
    scientificName: {
      type: String,
      required: true,
    },
    description: {
      type: String,

    },
    habitat: [
      {
        type: String,
     
      }
    ],
    appearance: {
      size: String,
      color: [String]
    },
    photos: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
)

const Birds = models.Bird || model<IBirdSchema, IBirdModel>("Bird", birdSchema)

export default Birds
