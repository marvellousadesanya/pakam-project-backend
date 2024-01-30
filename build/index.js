"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const verifyJWT_1 = __importDefault(require("./middlewares/verifyJWT"));
const credentials_1 = __importDefault(require("./middlewares/credentials"));
const app = (0, express_1.default)();
exports.app = app;
// const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbCon");
/* Sendgrid implementation */
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const PORT = process.env.PORT || 3500;
// Connect to MongoDB
connectDB();
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials_1.default);
// Cross Origin Resource Sharing
// app.use(cors(corsOptions));
// Routes imports
const account_1 = __importDefault(require("./routes/account"));
const account_2 = __importDefault(require("./routes/account"));
const assessment_1 = __importDefault(require("./routes/assessment"));
const assessment_2 = __importDefault(require("./routes/assessment"));
const assessment_3 = __importDefault(require("./routes/assessment"));
const assessment_4 = __importDefault(require("./routes/assessment"));
const assessment_5 = __importDefault(require("./routes/assessment"));
// built-in middleware to handle urlencoded form data
app.use(express_1.default.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express_1.default.json());
//middleware for cookies
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello");
});
// routes
app.use("/v1/register", account_1.default);
app.use("/v1/", account_2.default);
app.use(verifyJWT_1.default);
app.use("/v1/assessments", assessment_1.default);
app.use("/v1/create", assessment_2.default);
app.use("/v1/", assessment_3.default);
app.use("/v1/", assessment_5.default);
app.use("/v1/", assessment_4.default);
mongoose_1.default.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
//# sourceMappingURL=index.js.map