#!/bin/bash

echo "=== Stopping GPT-OSS Ollama Server ==="

# Check if Ollama is running
if pgrep -x "ollama" > /dev/null; then
    echo "[INFO] Stopping Ollama service..."
    pkill -x ollama
    
    # Wait a moment to ensure it stops
    sleep 2
    
    # Verify it stopped
    if pgrep -x "ollama" > /dev/null; then
        echo "[WARNING] Ollama still running, trying force kill..."
        pkill -9 -x ollama
    else
        echo "✅ Ollama service stopped successfully"
    fi
else
    echo "[INFO] Ollama service is not running"
fi

echo ""
echo "Service stopped. Run './run_gpt_ollama.sh' to start again."