#!/usr/bin/env bash

# Tenant Management System - Getting Started Script
# This script helps you get the application running quickly

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "🚀 Tenant Management System - Getting Started"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

# Display options
echo "Choose an action:"
echo ""
echo "  1) Start development server (npm run dev)"
echo "  2) Build for production (npm run build)"
echo "  3) Start production server (npm start)"
echo "  4) Run linter (npm run lint)"
echo "  5) Open in browser"
echo "  6) Exit"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo ""
        echo "🎯 Starting development server..."
        echo ""
        npm run dev
        ;;
    2)
        echo ""
        echo "🏗️  Building for production..."
        echo ""
        npm run build
        echo ""
        echo "✅ Build complete! Run 'npm start' to serve"
        ;;
    3)
        echo ""
        echo "🚀 Starting production server..."
        echo ""
        npm start
        ;;
    4)
        echo ""
        echo "🔍 Running linter..."
        echo ""
        npm run lint
        ;;
    5)
        echo ""
        echo "🌐 Opening in browser..."
        echo ""
        if command -v open &> /dev/null; then
            open "http://localhost:3000" 2>/dev/null || echo "⚠️  Could not open browser. Try http://localhost:3000 manually"
        else
            echo "⚠️  Could not auto-open browser. Try http://localhost:3000 manually"
        fi
        ;;
    6)
        echo "Goodbye! 👋"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please try again."
        exit 1
        ;;
esac

