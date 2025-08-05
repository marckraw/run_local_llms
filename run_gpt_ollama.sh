#!/bin/bash

echo "=== GPT-OSS 20B Local Server (via Ollama) ==="

# 1. Check if Ollama is running, if not start it
if ! pgrep -x "ollama" > /dev/null; then
    echo "[INFO] Starting Ollama service..."
    ollama serve > /dev/null 2>&1 &
    sleep 3
fi

# 2. Pull the GPT-OSS model if not already downloaded
if ! ollama list | grep -q "gpt-oss:20b"; then
    echo "[INFO] Downloading GPT-OSS 20B model (this will take a while, ~16GB)..."
    ollama pull gpt-oss:20b
else
    echo "[INFO] Model gpt-oss:20b already available"
fi

# 3. Get your Mac's LAN IP for iPhone access
LAN_IP=$(ipconfig getifaddr en0)
if [ -z "$LAN_IP" ]; then
    LAN_IP=$(ipconfig getifaddr en1)
fi

echo ""
echo "✅ Server ready! Access it from:"
echo "   • Mac: http://localhost:11434"
echo "   • iPhone (same WiFi): http://$LAN_IP:11434"
echo ""
echo "Try it now:"
echo "   ollama run gpt-oss:20b"
echo ""
echo "Or test the API:"
echo "   curl http://localhost:11434/api/generate -d '{\"model\":\"gpt-oss:20b\",\"prompt\":\"Hello!\",\"stream\":false}'"
echo ""