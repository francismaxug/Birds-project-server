import { Router } from "express"
import {
  createNewBird,
  updateABird,
  deleteBird,
  getASingleBird,
  getAllBirds
} from "../controllers/bird"

const router = Router()
router.post("/create-bird", createNewBird)
router.get("/getAllBirds", getAllBirds)
router.route("/:id").get(getASingleBird).patch(updateABird).delete(deleteBird)
export default router
