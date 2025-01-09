"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bird_1 = require("../controllers/bird");
const router = (0, express_1.Router)();
router.post("/create-bird", bird_1.createNewBird);
router.get("/getAllBirds", bird_1.getAllBirds);
router.route("/:id").get(bird_1.getASingleBird).patch(bird_1.updateABird).delete(bird_1.deleteBird);
exports.default = router;
