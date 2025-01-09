"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBird = exports.updateABird = exports.getAllBirds = exports.getASingleBird = exports.createNewBird = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const createNewBird = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { commonName, scientificName, description, habitat, appearance } = req.body;
    const cleanHabitatArray = (_a = habitat === null || habitat === void 0 ? void 0 : habitat.split(" ")) === null || _a === void 0 ? void 0 : _a.filter((item) => item !== "");
    const cleanColorsArray = (_c = (_b = JSON.parse(appearance)
        .colors) === null || _b === void 0 ? void 0 : _b.split(" ")) === null || _c === void 0 ? void 0 : _c.filter((item) => item !== "");
    const appearanceObj = {
        size: JSON.parse(appearance).size,
        colors: cleanColorsArray
    };
    const files = (_d = req.files) === null || _d === void 0 ? void 0 : _d.photos;
    if (!req.files) {
        const data = yield ((_e = req.context.services) === null || _e === void 0 ? void 0 : _e.bird.createBird({
            commonName,
            scientificName,
            description,
            habitat: cleanHabitatArray,
            appearance: appearanceObj,
            photos: []
        }));
        return res.status(200).json(data);
    }
    // Convert files to array if single file
    const imageFiles = files instanceof Array ? files : [files];
    console.log("Number of files to process:", imageFiles.length);
    const uploadResults = [];
    for (const file of imageFiles) {
        try {
            console.log("Processing file:", {
                name: file === null || file === void 0 ? void 0 : file.name,
                size: file === null || file === void 0 ? void 0 : file.size,
                mimetype: file === null || file === void 0 ? void 0 : file.mimetype
            });
            // Ensure file data exists
            if (!(file === null || file === void 0 ? void 0 : file.data)) {
                console.error("File data is missing");
                continue;
            }
            // Convert image to base64
            const imageData = file.data;
            const mimetype = file.mimetype;
            const tobase64 = imageData.toString("base64");
            // Log first 100 characters of base64 string to verify it's correct
            console.log("Base64 Preview:", tobase64.substring(0, 100));
            // Upload to Cloudinary
            const upload = yield cloudinary_1.default.uploader.upload(`data:${mimetype};base64,${tobase64}`, {
                folder: "upci-church-uploads"
            });
            console.log("Cloudinary upload success:", {
                url: upload.secure_url,
                publicId: upload.public_id
            });
            uploadResults.push(upload.secure_url);
        }
        catch (error) {
            console.error("Error processing file:");
            // You might want to add specific error handling here
        }
    }
    console.log("Upload Results:", uploadResults);
    // Save data to your service
    const data = yield ((_f = req.context.services) === null || _f === void 0 ? void 0 : _f.bird.createBird({
        commonName,
        scientificName,
        description,
        habitat: cleanHabitatArray,
        appearance: appearanceObj,
        photos: uploadResults
    }));
    console.log("Service Response:", data);
    return res.status(200).json(data);
}));
exports.createNewBird = createNewBird;
const getASingleBird = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const blogId = req.params.id;
    const blog = yield ((_g = req.context.services) === null || _g === void 0 ? void 0 : _g.bird.getSingleBird(blogId));
    // console.log(blog)
    return res.status(200).json(blog);
}));
exports.getASingleBird = getASingleBird;
const getAllBirds = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req)
    var _h;
    const allBlogs = yield ((_h = req.context.services) === null || _h === void 0 ? void 0 : _h.bird.getAllBirds());
    return res.status(200).json(allBlogs);
}));
exports.getAllBirds = getAllBirds;
//---update-bird------------
const updateABird = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    const birdId = req.params.id;
    console.log(req.body);
    const updatedBlog = yield ((_j = req.context.services) === null || _j === void 0 ? void 0 : _j.bird.updateBird(birdId, req.body));
    // console.log(updatedBlog)
    return res.status(200).json(updatedBlog);
}));
exports.updateABird = updateABird;
//------delete blog--------------
const deleteBird = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const birdId = req.params.id;
    //---delete blog---------------
    const deleteBird = yield ((_k = req.context.services) === null || _k === void 0 ? void 0 : _k.bird.deleteBird(birdId));
    return res.status(200).json(deleteBird);
}));
exports.deleteBird = deleteBird;
