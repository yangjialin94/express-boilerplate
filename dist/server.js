"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const API_PREFIX = process.env.API_PREFIX || "/api/v1";
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// Health check endpoint
app.get("/", (_req, res) => {
    res.json({
        message: "Knowli API is running!",
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
    });
});
// API routes will go here
app.get(`${API_PREFIX}/health`, (_req, res) => {
    res.json({
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});
// 404 handler
app.use("*", (_req, res) => {
    res.status(404).json({
        error: "Route not found",
        message: "The requested endpoint does not exist",
    });
});
// Error handling middleware
app.use((err, _req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
    });
    next();
});
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 API available at http://localhost:${PORT}${API_PREFIX}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
