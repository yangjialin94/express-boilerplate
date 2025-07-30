import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Error interface
interface CustomError extends Error {
  status?: number;
}

const app = express();
const PORT = process.env.PORT || 5000;
const API_PREFIX = process.env.API_PREFIX || "/api/v1";

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

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

// Sample API endpoints for testing
// GET - Get all users (mock data)
app.get(`${API_PREFIX}/users`, (_req, res) => {
  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "user" },
  ];
  res.json({
    success: true,
    data: mockUsers,
    count: mockUsers.length,
  });
});

// GET - Get user by ID
app.get(`${API_PREFIX}/users/:id`, (req, res) => {
  const userId = parseInt(req.params.id);
  const mockUser = { id: userId, name: "John Doe", email: "john@example.com", role: "admin" };

  if (userId < 1 || userId > 100) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  res.json({
    success: true,
    data: mockUser,
  });
});

// POST - Create a new user
app.post(`${API_PREFIX}/users`, (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: "Name and email are required",
    });
  }

  const newUser = {
    id: Math.floor(Math.random() * 1000) + 1,
    name,
    email,
    role: "user",
    createdAt: new Date().toISOString(),
  };

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
});

// PUT - Update user
app.put(`${API_PREFIX}/users/:id`, (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  if (userId < 1 || userId > 100) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  const updatedUser = {
    id: userId,
    name: name || "Updated Name",
    email: email || "updated@example.com",
    role: "user",
    updatedAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
});

// DELETE - Delete user
app.delete(`${API_PREFIX}/users/:id`, (req, res) => {
  const userId = parseInt(req.params.id);

  if (userId < 1 || userId > 100) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  res.json({
    success: true,
    message: `User with ID ${userId} deleted successfully`,
  });
});

// Sample protected route (simulating authentication)
app.get(`${API_PREFIX}/profile`, (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Authentication required",
      message: "Please provide a valid Bearer token",
    });
  }

  res.json({
    success: true,
    data: {
      id: 1,
      name: "Current User",
      email: "user@example.com",
      profile: {
        bio: "This is a sample user profile",
        joinedAt: "2024-01-01",
        preferences: {
          theme: "dark",
          notifications: true,
        },
      },
    },
  });
});

// Sample data endpoint with query parameters
app.get(`${API_PREFIX}/posts`, (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;

  let mockPosts = [
    { id: 1, title: "First Post", content: "This is the first post", author: "John Doe" },
    { id: 2, title: "Second Post", content: "This is the second post", author: "Jane Smith" },
    { id: 3, title: "Third Post", content: "This is the third post", author: "Bob Johnson" },
    { id: 4, title: "Fourth Post", content: "Another interesting post", author: "Alice Brown" },
    { id: 5, title: "Fifth Post", content: "Yet another post", author: "Charlie Wilson" },
  ];

  // Filter by search term if provided
  if (search) {
    mockPosts = mockPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = mockPosts.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: paginatedPosts,
    pagination: {
      page,
      limit,
      total: mockPosts.length,
      pages: Math.ceil(mockPosts.length / limit),
    },
    ...(search && { search }),
  });
});

// Error handling middleware
app.use(
  (err: CustomError, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
      error: "Internal Server Error",
      message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
    });
    next();
  }
);

// 404 handler - must be last
app.use((_req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: "The requested endpoint does not exist",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}${API_PREFIX}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
