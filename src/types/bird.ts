import { Document, Model, Types } from "mongoose"
interface IAppearance {
  size: string
  color: string[]
}

export interface IBird {
  commonName: string
  scientificName: string
  description: string
  habitat: string[]
  appearance: IAppearance
  photos?: string[]
}

export interface IBirdSchema extends IBird, Document {
  _id: Types.ObjectId
}

export interface IBirdModel extends Model<IBirdSchema> {}
