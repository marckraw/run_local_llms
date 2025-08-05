# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple Bash utility for running the GPT-OSS 20B model locally using Ollama. The project consists of a shell script that handles model download and server deployment, plus test clients.

## Commands

### Running the LLM Server (Ollama - Working on Mac)
```bash
./run_gpt_ollama.sh
```
This uses Ollama (which works on macOS ARM64) to:
- Download GPT-OSS 20B model (~16GB)
- Start an OpenAI-compatible API server on port 11434

### Testing the Server
```bash
# Direct Ollama API
curl http://localhost:11434/api/generate -d '{"model":"gpt-oss:20b","prompt":"Hello!","stream":false}'

# With OpenAI SDK
npm test
```


## Architecture

The project uses Ollama to run GPT-OSS locally:

1. **Model Management**: Downloads and caches GPT-OSS 20B via Ollama
2. **Network Configuration**: Detects LAN IP for cross-device access
3. **Server Deployment**: Runs Ollama with OpenAI-compatible API

Ollama provides an OpenAI-compatible server, making it compatible with any OpenAI SDK client by pointing to `http://localhost:11434/v1`.

## Key Technical Details

- **Model**: OpenAI GPT-OSS 20B (requires ~16GB disk space)
- **Port**: 11434 (Ollama default)
- **API Compatibility**: OpenAI v1 API format via `/v1` endpoints
- **Network Access**: Both localhost and LAN (for iPhone/mobile access)
- **Dependencies**: Ollama