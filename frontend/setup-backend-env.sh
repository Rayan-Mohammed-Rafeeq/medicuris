#!/bin/bash

# Backend Environment Variables Setup Script
# Generated from Vly for Git Sync
# Run this script to set up your Convex backend environment variables

echo 'Setting up Convex backend environment variables...'

# Check if Convex CLI is installed
if ! command -v npx &> /dev/null; then
    echo 'Error: npx is not installed. Please install Node.js and npm first.'
    exit 1
fi

echo "Setting JWKS..."
npx convex env set "JWKS" -- "{\"keys\":[{\"use\":\"sig\",\"kty\":\"RSA\",\"n\":\"x2n1PDoj0gXzh02jcIqFwXOH6Qzli7fY4vSo0W0cnqWcIqJmVL434wZskbUklzmi9G-gvaCsklIxoEj84vx1tesm8RoLipNlO_UVFrU1jjhHQ8YpIAP9J-Naq3R-6d8ZFGNCiV-yFVY79Zo0i0LbB8CGJMTBBRIyoHrqfvIDahaIBmbFGnS7BR_JHO5AUkygiz5YbZ1Fc9chmx2TZUMZTlJYybXhzaJLkO2Or0c1ki8lVf17JGsKmlmbjEmtADD2jeAc55hZ8vBUShXYr1Cq49DlAU0IinYrhgeoDAWg1FU68hBBXjUaXVd7uJ-FJYXSvhaaTSKcwWzQqsm-MVTykQ\",\"e\":\"AQAB\"}]}"

echo "Setting JWT_PRIVATE_KEY..."
npx convex env set "JWT_PRIVATE_KEY" -- "-----BEGIN PRIVATE KEY----- MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHafU8OiPSBfOH TaNwioXBc4fpDOWLt9ji9KjRbRyepZwiomZUvjfjBmyRtSSXOaL0b6C9oKySUjGg SPzi/HW16ybxGguKk2U79RUWtTWOOEdDxikgA/0n41qrdH7p3xkUY0KJX7IVVjv1 mjSLQtsHwIYkxMEFEjKgeup+8gNqFogGZsUadLsFH8kc7kBSTKCLPlhtnUVz1yGb HZNlQxlOUljJteHNokuQ7Y6vRzWSLyVV/XskawqaWZuMSa0AMPaN4BznmFny8FRK FdivUKrj0OUBTQiKdiuGB6gMBaDUVTryEEFeNRpdV3u4n4UlhdK+FppNIpzBbNCq yb4xVPKRAgMBAAECggEALTEj4NOLQSJUo53yc4ONFv+L9kKUNeMDDcIlDRslcIW3 GflEaCGYsERJMAdFhNkMx0kR/E+QtHNYqErKNtXAhmsFjv/YTD4lo94hupz0B2hV LDSZJtaIlXTWnEMhLPbArAhnsJLFnMTHf1xEWqga08mrjOMjHDdYzlo00PKfV/ff FmFb8HrCyOuYFKinSwiXKccsHd5yL10RpPep0f/j05O8sIxCGhhUY1m6cAa/N7oj De4ZrJb1z0enfFC+8tLrz4Lj5/+xOmhB7y1fwtvzl/jSmkfxLLzxcrbgZNJ1MQ30 lWs7TfPFOah5gUMfyVUnibBBBTlA6lA3lbjI72UUnQKBgQDxf76xg4jIuEAsTpk2 0IsOG0JkZjzt3yX7ehlnNrwGXkHr38nhBBpQ8yMdk25gv4WZ8yx0J7D10jwJl6Wn jkSVb75g8Wva8ErZLI1VdwUCKF9czXd+tbz2bf3WteEF3NN6I0HQ6XrCqcd9wZv7 WDQjZF7yayXlGqtW6oWIRZhUJQKBgQDTY0rnWcWcxRmLULRhoRgQv5W+MKgTMJzg 9V9kOkDfeGUNQm6TP3JmNAI7Mokc5cV5wICm5j1XvtavW3KjfBqNsTuWBHp2FrkJ 1HeKQK6FAbWUir+GHzwN/p82dq8DhdwwvlTgGhSELDSdUgQGPcVKwuKGBsYNzWOT 1uZv9iOC/QKBgDGvEWFd6Uc6OOGkrfrL/r/BNfCH5CMgFKVfIljMtvQsci1/1f24 JV3gF6pfCYdX/7mDgPLIs6xvOzDSBR+qskt4ONei84iQhSWW9+DMYrhl6/CgyOPF qgGc8Ws58fiNzOhE1qaPUlU4LrWdnmSgaeGaJbqD9sDisrtn9l7pyoQNAoGBAMZY E29Sn4ZCtn4vAqHcmw0UBvhHBV3ELl8yPQh5VGeauw6e98v4K2pUgId1Goxf2FQu WUjBHmvXp+8wGjfl+bBbzTItD48AMS1VC7lQibBJc0xmh+DcK+hhsphS8lKW5o1h +ZexQPDn3ZKD4zzL9vP4Or5RWsKWpkmQyfXh+V4tAoGBAJUCVQunEUACHDvXUuvD fVksDPZUHTHk2sVYze/bQmG8nLC0Gk1FPS23q7OjcYLPPrG3NPMo91raPGUK+CG7 UcotcVA8JOD5kxh3mCggBI5VowuOWPiip5Jxzxpoz7W9WNbDILdHAHWQUfDmxQhd otI+Tf8eJeyk9GIcokPRAqca -----END PRIVATE KEY-----"

echo "Setting SITE_URL..."
npx convex env set "SITE_URL" -- "http://localhost:5173"

echo "Setting VLY_APP_NAME..."
npx convex env set "VLY_APP_NAME" -- "MediCuris UI"

echo "✅ All backend environment variables have been set!"
echo "You can now run: pnpm dev:backend"
