# Knowli API

A robust Express.js API built with TypeScript, featuring sample endpoints for testing and development.

## 🚀 Features

- **TypeScript** - Full type safety and modern JavaScript features
- **Express.js** - Fast, unopinionated web framework
- **CORS** - Cross-origin resource sharing enabled
- **Environment Variables** - Configurable via `.env` file
- **Error Handling** - Comprehensive error handling middleware
- **Linting & Formatting** - ESLint and Prettier configured
- **Auto-reload** - Nodemon for development
- **Sample APIs** - Ready-to-use endpoints for testing

## 📁 Project Structure

```
knowli-api/
├── src/
│   └── server.ts          # Main server file with all routes
├── dist/                  # Compiled JavaScript output
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── eslint.config.cjs      # ESLint configuration
├── .prettierrc            # Prettier configuration
├── api-tester.html        # Browser-based API tester
├── test-apis.sh           # Shell script for testing APIs
└── README.md              # This file
```

## 🛠 Setup & Installation

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Environment setup:**
   The `.env` file is already configured with default values:

   ```
   PORT=3001
   NODE_ENV=development
   DB_PATH=./database/knowli.db
   API_PREFIX=/api/v1
   CORS_ORIGIN=http://localhost:3000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=24h
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 📚 Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm run lint` - Lint and fix code issues
- `npm run format` - Format code with Prettier

## 🔌 API Endpoints

### Server Health

- **GET** `/` - Server status and information

### API Health

- **GET** `/api/v1/health` - API health check with uptime

### Users Management

- **GET** `/api/v1/users` - Get all users (mock data)
- **GET** `/api/v1/users/:id` - Get user by ID
- **POST** `/api/v1/users` - Create new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **PUT** `/api/v1/users/:id` - Update user
- **DELETE** `/api/v1/users/:id` - Delete user

### Posts

- **GET** `/api/v1/posts` - Get posts with pagination and search
  - Query parameters:
    - `page` (number) - Page number (default: 1)
    - `limit` (number) - Items per page (default: 10)
    - `search` (string) - Search term for title/content

### Protected Routes

- **GET** `/api/v1/profile` - Get user profile (requires Bearer token)
  - Header: `Authorization: Bearer your-token`

## 🧪 Testing the API

### Method 1: Browser Testing

Open `api-tester.html` in your browser for an interactive API testing interface.

### Method 2: Shell Script Testing

```bash
# Make script executable (if not already)
chmod +x test-apis.sh

# Run all tests
./test-apis.sh
```

### Method 3: Manual Testing with curl

**Basic server test:**

```bash
curl http://localhost:3001/
```

**Get all users:**

```bash
curl http://localhost:3001/api/v1/users
```

**Create a new user:**

```bash
curl -X POST http://localhost:3001/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com"}'
```

**Get posts with pagination:**

```bash
curl "http://localhost:3001/api/v1/posts?page=1&limit=3"
```

**Test protected route:**

```bash
curl http://localhost:3001/api/v1/profile \
  -H "Authorization: Bearer sample-token-123"
```

## 🔧 Configuration

### TypeScript Configuration

The `tsconfig.json` is configured for:

- ES6 target
- CommonJS modules
- Strict type checking
- Source maps for debugging

### ESLint & Prettier

- Automatic code formatting on save
- TypeScript-specific linting rules
- Integration with Prettier for consistent formatting

### Environment Variables

All configuration is handled through environment variables in `.env`:

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment mode
- `API_PREFIX` - API route prefix
- `CORS_ORIGIN` - Allowed CORS origin

## 📊 Response Format

All API responses follow a consistent format:

**Success Response:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

**Paginated Response:**

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

## 🚀 Next Steps

Consider adding:

- [ ] Database integration (SQLite setup included)
- [ ] Authentication middleware (JWT ready)
- [ ] Input validation with Joi or Zod
- [ ] API documentation with Swagger
- [ ] Unit tests with Jest
- [ ] Rate limiting
- [ ] Logging with Winston
- [ ] Docker containerization

## 🔒 Security Notes

- Change the `JWT_SECRET` in production
- Update CORS settings for production URLs
- Add input validation for all endpoints
- Implement proper authentication
- Use HTTPS in production

## 📝 License

ISC License - Feel free to use this project as a starting point for your APIs!
