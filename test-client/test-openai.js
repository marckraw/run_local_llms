// Test GPT-OSS using OpenAI SDK

import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1',  // Ollama's OpenAI-compatible endpoint
  apiKey: 'ollama', // Required but ignored by Ollama
});

async function testWithOpenAISDK() {
  // This is EXACTLY the same code you'd use with real OpenAI!
  const completion = await openai.chat.completions.create({
    model: 'gpt-oss:20b',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'What is React in one sentence?' }
    ],
  });

  console.log('Response:', completion.choices[0].message.content);
}

testWithOpenAISDK().catch(console.error);