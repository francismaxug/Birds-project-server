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
class BirdServices extends app_1.InitAdmin {
    constructor(context) {
        super(context);
        this.createBird = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.queryDB.birdModel.create(input);
                return {
                    status: "success",
                    message: "Bird created successfully"
                };
            }
            catch (err) {
                throw err;
            }
        });
        this.getSingleBird = (birdId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bird = yield this.queryDB.birdModel.findById(birdId);
                if (!bird) {
                    throw (0, appError_1.default)("Bird  not found", 404);
                }
                return bird;
            }
            catch (err) {
                throw err;
            }
        });
        this.getAllBirds = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const birds = yield this.queryDB.birdModel.find({});
                // console.log("bird", birds)
                return birds;
            }
            catch (error) {
                throw error;
            }
        });
        this.updateBird = (birdId, input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bird = yield this.queryDB.birdModel.findById(birdId);
                if (!bird) {
                    throw (0, appError_1.default)("Bird not found", 404);
                }
                yield this.queryDB.birdModel.findByIdAndUpdate(birdId, Object.assign({}, input), { new: true });
                return {
                    status: "success",
                    message: "Bird updated successfully"
                };
            }
            catch (err) {
                throw err;
            }
        });
        this.deleteBird = (birdId) => __awaiter(this, void 0, void 0, function* () {
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
