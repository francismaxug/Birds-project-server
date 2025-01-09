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
exports.BirdServices = void 0;
const app_1 = require("../types/app");
const appError_1 = __importDefault(require("../utils/appError"));
// import sendEmailToUser from "../utils/email"
class BirdServices extends app_1.InitAdmin {
    constructor(context) {
        super(context);
        this.createBird = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newBird = yield this.queryDB.birdModel.create(input);
                return {
                    message: "Bird created successfully",
                    bird: newBird
                };
            }
            catch (err) {
                throw err;
            }
        });
        this.getSingleBird = (birdId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield this.queryDB.birdModel.findById(birdId);
                if (!blog) {
                    throw (0, appError_1.default)("Bird  not found", 404);
                }
                return blog;
            }
            catch (err) {
                throw err;
            }
        });
        this.getAllBirds = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const birds = yield this.queryDB.birdModel.find({});
                // console.log("bird", birds)
                // Create an instance of APIFeatures
                return birds;
            }
            catch (error) {
                throw error;
            }
        });
        //----update blog post--------------------
        this.updateBird = (birdId, input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bird = yield this.queryDB.birdModel.findById(birdId);
                if (!bird) {
                    throw (0, appError_1.default)("Bird not found", 404);
                }
                const updatedBlog = yield this.queryDB.birdModel.findByIdAndUpdate(birdId, Object.assign({}, input), { new: true });
                return {
                    message: "Bird updated successfully",
                    blog: updatedBlog
                };
            }
            catch (err) {
                throw err;
            }
        });
        //-------delete blog post----------------
        this.deleteBird = (birdId) => __awaiter(this, void 0, void 0, function* () {
            console.log("birdId", birdId);
            try {
                const bird = yield this.queryDB.birdModel.findById(birdId);
                console.log("bird", bird);
                if (!bird) {
                    throw (0, appError_1.default)("Error deleting bird", 404);
                }
                yield this.queryDB.birdModel.findByIdAndDelete(birdId);
                return {
                    status: "success",
                    message: "Bird deleted successfully"
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.BirdServices = BirdServices;
