# Express TypeScript Boilerplate

A modern Express.js boilerplate with TypeScript, featuring comprehensive sample endpoints, development tools, and best practices for building robust APIs.

## 🚀 Features

- **TypeScript** - Full type safety and modern JavaScript features
- **Express.js** - Fast, unopinionated web framework
- **PostgreSQL** - Robust relational database integration
- **Redis** - High-performance caching and session storage
- **CORS** - Cross-origin resource sharing enabled
- **Environment Variables** - Configurable via `.env` file
- **Error Handling** - Comprehensive error handling middleware
- **Linting & Formatting** - ESLint and Prettier configured
- **Auto-reload** - Nodemon for development
- **Sample APIs** - Ready-to-use endpoints for learning and testing
- **Testing Tools** - Browser and shell script API testers included
- **Production Ready** - Build scripts and best practices

## 📁 Project Structure

```text
express-boilerplate/
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

## 🛠 Quick Start

### Prerequisites

Make sure you have the following services running:

- **PostgreSQL** - Database server
- **Redis** - Cache and session store
- **Node.js** - Runtime environment (v18+ recommended)

### Installation

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Set up your database:**

   ```bash
   # Create a PostgreSQL database
   createdb express_boilerplate

   # Update .env with your database credentials
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:3001`

4. **Test the API:**
   - Open `api-tester.html` in your browser for interactive testing
   - Or run `./test-apis.sh` to test all endpoints

### Docker Development Setup (Optional)

For a consistent development environment with PostgreSQL and Redis:

```bash
# Start PostgreSQL and Redis with Docker Compose
docker-compose up -d postgres redis

# Or use individual Docker containers
docker run --name postgres-dev -e POSTGRES_DB=express_boilerplate -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
docker run --name redis-dev -p 6379:6379 -d redis:7-alpine
```

## 🔧 Environment Configuration

The `.env` file is already configured with default values:

```env
PORT=3001
NODE_ENV=development
API_PREFIX=/api/v1
CORS_ORIGIN=http://localhost:3000

# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=express_boilerplate
DB_USER=postgres
DB_PASSWORD=your_password

# Redis Cache
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
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
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` - PostgreSQL connection
- `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` - Redis connection
- `JWT_SECRET`, `JWT_EXPIRES_IN` - JWT authentication settings

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

## 🚀 Getting Started with Your Project

This boilerplate provides a solid foundation for building APIs. Here's how to customize it for your needs:

### 1. Customize the Project

- Update the `name` field in `package.json`
- Modify environment variables in `.env`
- Replace sample endpoints with your actual API routes
- Update this README with your project's specific information

### 2. Extend the Functionality

Consider adding these features based on your requirements:

- [ ] **Database Migrations** - Add database schema migration tools
- [ ] **Database ORM/Query Builder** - Integrate Prisma, TypeORM, or Knex.js
- [ ] **Redis Session Management** - Implement session storage with Redis
- [ ] **Caching Layer** - Add Redis-based API response caching
- [ ] **Authentication** - JWT middleware is ready, add your auth logic
- [ ] **Input Validation** - Add Joi, Zod, or express-validator
- [ ] **API Documentation** - Integrate Swagger/OpenAPI
- [ ] **Testing Suite** - Add Jest or Mocha with comprehensive tests
- [ ] **Rate Limiting** - Implement express-rate-limit with Redis store
- [ ] **Logging** - Add Winston or similar logging library
- [ ] **Docker Support** - Add Dockerfile and docker-compose.yml
- [ ] **CI/CD Pipeline** - GitHub Actions, GitLab CI, or similar

### 3. Production Deployment

Before deploying to production:

- Set up production PostgreSQL and Redis instances
- Update database and Redis connection strings in environment variables
- Change the `JWT_SECRET` to a secure random string
- Update CORS settings for your production URLs
- Set `NODE_ENV=production`
- Configure proper logging and monitoring
- Use HTTPS and security headers
- Set up database backups and Redis persistence
- Configure connection pooling for PostgreSQL
- Implement Redis clustering if needed for high availability

## 📝 Contributing

This is a boilerplate project designed to be forked and customized. Feel free to:

- Fork this repository for your own projects
- Submit issues for bugs or improvements
- Create pull requests for enhancements that benefit the boilerplate

## � License

MIT License - Feel free to use this boilerplate as a starting point for your APIs!
