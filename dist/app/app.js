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
exports.startApp = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const models_1 = __importDefault(require("../models"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const services_1 = require("../services");
const customError_1 = __importDefault(require("../middleware/customError"));
const bird_1 = __importDefault(require("../routes/bird"));
exports.app = (0, express_1.default)();
const startApp = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appContext = {};
        appContext.queryDB = yield (0, models_1.default)(config.dbString);
        appContext.services = yield (0, services_1.startServices)(appContext);
        // const corsOptions = {
        //   origin:
        //     process.env.NODE_ENV === "development"
        //       ? "http://localhost:3000"
        //       : "https://upci-church-app.vercel.app",
        //   credentials: true
        // }
        if (process.env.NODE_ENV === "development") {
            exports.app.use((0, morgan_1.default)("dev"));
        }
        exports.app.use((0, cors_1.default)({ origin: "*" }));
        exports.app.use((0, cookie_parser_1.default)());
        exports.app.use(express_1.default.json());
        exports.app.use(express_1.default.urlencoded({ extended: false }));
        exports.app.use((req, res, next) => {
            ;
            req.context = appContext;
            next();
        });
        exports.app.use((0, express_fileupload_1.default)({}));
        exports.app.use("/api/v1/bird", bird_1.default);
        exports.app.use(customError_1.default);
        exports.app.all("*", (req, res) => {
            res.status(404).json({
                status: "failed",
                message: `Can't find ${req.originalUrl} on this server`
            });
        });
    }
    catch (error) {
        throw error;
    }
    exports.app.listen(config.initApp.port, () => {
        console.log(`Server is running on port ${config.initApp.port}`);
    });
});
exports.startApp = startApp;
