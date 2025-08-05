// Test GPT-OSS using OpenAI SDK with streaming

import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1',  // Ollama's OpenAI-compatible endpoint
  apiKey: 'ollama', // Required but ignored by Ollama
});

async function testWithOpenAISDK() {
  console.log('🤖 GPT-OSS: ');
  
  // Stream the response like ChatGPT!
  const stream = await openai.chat.completions.create({
    model: 'gpt-oss:20b',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain JavaScript closures with a simple example.' }
    ],
    stream: true,  // Enable streaming
  });

  // Print each chunk as it arrives
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    process.stdout.write(content);
  }
  
  console.log('\n\n✅ Stream complete!');
}

testWithOpenAISDK().catch(console.error);