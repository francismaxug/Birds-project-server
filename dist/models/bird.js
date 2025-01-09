"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const birdSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true
});
const Birds = mongoose_1.models.Bird || (0, mongoose_1.model)("Bird", birdSchema);
exports.default = Birds;
