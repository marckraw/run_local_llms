#!/bin/bash

MODEL_NAME="openai/gpt-oss-20b"
MODEL_DIR="$HOME/gpt-oss-20b"
PORT=8000

echo "=== GPT-OSS Local Server Launcher ==="

# 1. Check for uv or pip
if ! command -v uv &> /dev/null
then
    echo "[INFO] uv not found. Installing uv..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.cargo/bin:$PATH"
fi

# 2. Install vLLM if not installed
if ! uv pip show vllm &> /dev/null
then
    echo "[INFO] Installing vLLM with GPT-OSS support..."
    uv pip install --pre vllm==0.10.1+gptoss \
        --extra-index-url https://wheels.vllm.ai/gpt-oss/
fi

# 3. Download model if not present
if [ ! -d "$MODEL_DIR" ]; then
    echo "[INFO] Downloading GPT-OSS 20B model (~16GB)..."
    huggingface-cli download $MODEL_NAME --include "original/*" --local-dir $MODEL_DIR
else
    echo "[INFO] Model already exists at $MODEL_DIR"
fi

# 4. Detect LAN IP for iPhone access
LAN_IP=$(ipconfig getifaddr en0)
if [ -z "$LAN_IP" ]; then
    LAN_IP=$(ipconfig getifaddr en1)
fi
if [ -z "$LAN_IP" ]; then
    LAN_IP="127.0.0.1"
fi

echo ""
echo "=== Starting vLLM OpenAI-compatible server ==="
echo "Local access: http://127.0.0.1:$PORT/v1"
echo "LAN access (iPhone same Wi-Fi): http://$LAN_IP:$PORT/v1"
echo ""

# 5. Start vLLM server
vllm serve $MODEL_NAME --host 0.0.0.0 --port $PORT
