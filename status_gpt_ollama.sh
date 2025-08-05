#!/bin/bash

echo "=== GPT-OSS Ollama Server Status ==="
echo ""

# Check if Ollama service is running
if pgrep -x "ollama" > /dev/null; then
    echo "🟢 Ollama Service: RUNNING"
    
    # Get PID
    PID=$(pgrep -x "ollama")
    echo "   PID: $PID"
    
    # Check if the API is responding
    if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        echo "🟢 API Status: RESPONDING"
        echo "   Endpoint: http://localhost:11434"
        
        # Get LAN IP
        LAN_IP=$(ipconfig getifaddr en0)
        if [ -z "$LAN_IP" ]; then
            LAN_IP=$(ipconfig getifaddr en1)
        fi
        if [ ! -z "$LAN_IP" ]; then
            echo "   LAN Access: http://$LAN_IP:11434"
        fi
    else
        echo "🔴 API Status: NOT RESPONDING"
    fi
    
    # Check available models
    echo ""
    echo "Available Models:"
    if ollama list | grep -q "gpt-oss:20b"; then
        MODEL_INFO=$(ollama list | grep "gpt-oss:20b")
        echo "   ✅ $MODEL_INFO"
    else
        echo "   ⚠️  GPT-OSS 20B not found (run ./run_gpt_ollama.sh to download)"
    fi
    
    # Show other models if any
    OTHER_MODELS=$(ollama list | grep -v "gpt-oss:20b" | grep -v "NAME" | head -5)
    if [ ! -z "$OTHER_MODELS" ]; then
        echo "$OTHER_MODELS" | while read line; do
            echo "   • $line"
        done
    fi
    
else
    echo "🔴 Ollama Service: NOT RUNNING"
    echo ""
    echo "To start the service, run:"
    echo "   ./run_gpt_ollama.sh"
fi

echo ""