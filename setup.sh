#!/bin/bash
set -e

echo "=========================================="
echo "  My AI Chatbot - Setup Script"
echo "=========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found. Please install it:"
    echo "   https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker found"
echo ""
echo "🚀 Starting containers..."
docker-compose up -d

echo ""
echo "⏳ Waiting for Ollama to be ready..."
sleep 5

echo ""
echo "📥 Downloading LLM model (llama3.1 - 4.7GB)..."
docker exec -it ollama ollama pull llama3.1

echo ""
echo "=========================================="
echo "  ✅ Setup Complete!"
echo "=========================================="
echo ""
echo "🌐 Open your browser: http://localhost:3000"
echo ""
echo "📋 Useful commands:"
echo "   docker-compose logs -f     → View logs"
echo "   docker-compose down        → Stop chatbot"
echo "   docker-compose up -d       → Start chatbot"
echo "   docker exec -it ollama ollama list  → List models"
echo ""
