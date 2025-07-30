#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3001"
API_URL="$BASE_URL/api/v1"

echo -e "${BLUE}🧪 Testing Knowli API Endpoints${NC}\n"

# Test server health
echo -e "${YELLOW}1. Testing Server Health:${NC}"
echo "GET $BASE_URL/"
curl -s "$BASE_URL/" | jq '.'
echo -e "\n"

# Test API health
echo -e "${YELLOW}2. Testing API Health:${NC}"
echo "GET $API_URL/health"
curl -s "$API_URL/health" | jq '.'
echo -e "\n"

# Test GET all users
echo -e "${YELLOW}3. Testing GET All Users:${NC}"
echo "GET $API_URL/users"
curl -s "$API_URL/users" | jq '.'
echo -e "\n"

# Test GET user by ID
echo -e "${YELLOW}4. Testing GET User by ID:${NC}"
echo "GET $API_URL/users/1"
curl -s "$API_URL/users/1" | jq '.'
echo -e "\n"

# Test GET user by invalid ID
echo -e "${YELLOW}5. Testing GET User by Invalid ID:${NC}"
echo "GET $API_URL/users/999"
curl -s "$API_URL/users/999" | jq '.'
echo -e "\n"

# Test POST create user
echo -e "${YELLOW}6. Testing POST Create User:${NC}"
echo "POST $API_URL/users"
curl -s -X POST "$API_URL/users" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com"}' | jq '.'
echo -e "\n"

# Test POST create user with missing data
echo -e "${YELLOW}7. Testing POST Create User (Invalid):${NC}"
echo "POST $API_URL/users (missing email)"
curl -s -X POST "$API_URL/users" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User"}' | jq '.'
echo -e "\n"

# Test PUT update user
echo -e "${YELLOW}8. Testing PUT Update User:${NC}"
echo "PUT $API_URL/users/1"
curl -s -X PUT "$API_URL/users/1" \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated User", "email": "updated@example.com"}' | jq '.'
echo -e "\n"

# Test DELETE user
echo -e "${YELLOW}9. Testing DELETE User:${NC}"
echo "DELETE $API_URL/users/1"
curl -s -X DELETE "$API_URL/users/1" | jq '.'
echo -e "\n"

# Test protected route without auth
echo -e "${YELLOW}10. Testing Protected Route (No Auth):${NC}"
echo "GET $API_URL/profile"
curl -s "$API_URL/profile" | jq '.'
echo -e "\n"

# Test protected route with auth
echo -e "${YELLOW}11. Testing Protected Route (With Auth):${NC}"
echo "GET $API_URL/profile (with Bearer token)"
curl -s "$API_URL/profile" \
  -H "Authorization: Bearer sample-token-123" | jq '.'
echo -e "\n"

# Test posts with pagination
echo -e "${YELLOW}12. Testing GET Posts (Paginated):${NC}"
echo "GET $API_URL/posts?page=1&limit=3"
curl -s "$API_URL/posts?page=1&limit=3" | jq '.'
echo -e "\n"

# Test posts with search
echo -e "${YELLOW}13. Testing GET Posts (With Search):${NC}"
echo "GET $API_URL/posts?search=first"
curl -s "$API_URL/posts?search=first" | jq '.'
echo -e "\n"

# Test 404 route
echo -e "${YELLOW}14. Testing 404 Route:${NC}"
echo "GET $API_URL/nonexistent"
curl -s "$API_URL/nonexistent" | jq '.'
echo -e "\n"

echo -e "${GREEN}✅ All API tests completed!${NC}"
