# Local GPT-OSS 20B Server

Run OpenAI's GPT-OSS 20B model locally on your Mac with OpenAI SDK compatibility!

## Quick Start

```bash
# 1. Start the server
./run_gpt_ollama.sh

# 2. Check server status
./status_gpt_ollama.sh

# 3. Test it works
cd test-client
npm install
npm run test:openai  # Test with OpenAI SDK
npm run test:direct  # Test with direct Ollama API

# 4. Stop the server when done
./stop_gpt_ollama.sh
```

## What's GPT-OSS?

OpenAI's open-source 20B parameter model with:
- Full chain-of-thought reasoning (you can see what it's thinking!)
- OpenAI API compatibility
- Runs locally on your Mac

## Usage with OpenAI SDK

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1',  // Your local server
  apiKey: 'ollama',  // Required but ignored
});

// Use exactly like ChatGPT!
const response = await openai.chat.completions.create({
  model: 'gpt-oss:20b',
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

## iPhone Access

When the server is running, you can access it from your iPhone:
- Check the LAN IP printed by the script
- Use `http://[YOUR_LAN_IP]:11434/v1` as the base URL

## Why Ollama?

- Works perfectly on macOS ARM64 (Apple Silicon)
- Provides OpenAI API compatibility at `/v1` endpoints
- Easy one-command setup

## Project Structure

```
/
├── run_gpt_ollama.sh      # Start the Ollama server
├── status_gpt_ollama.sh   # Check server status
├── stop_gpt_ollama.sh     # Stop the Ollama server
└── test-client/           # Test client examples
    ├── package.json
    ├── test-openai.js     # OpenAI SDK example
    └── test-direct.js     # Direct Ollama API example
```