"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const db_1 = require("./src/database/db");
const config_1 = require("./src/config");
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const auth_routes_1 = __importDefault(require("./src/routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, express_session_1.default)({
    secret: config_1.config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config_1.config.isProduction },
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: config_1.config.allowedOrigins,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", JSON.stringify(err, null, 2));
    res.status(500).json({ error: "Internal Server Error" });
});
(0, db_1.connectDB)();
server.listen(config_1.config.port, () => {
    console.log(`🚀 Server is running on port ${config_1.config.port}`);
});
