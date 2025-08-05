// Basic OpenAI SDK request (non-streaming)

import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
});

async function basicRequest() {
  console.log('🤖 OpenAI SDK Basic Request (non-streaming)\n');
  console.log('=' .repeat(50));
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-oss:20b',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'What is TypeScript?' }
    ],
    stream: false
  });
  
  console.log('\n✅ Response:');
  console.log(completion.choices[0].message.content);
  
  console.log('\n📊 Usage:');
  console.log(`  - Prompt tokens: ${completion.usage?.prompt_tokens || 'N/A'}`);
  console.log(`  - Completion tokens: ${completion.usage?.completion_tokens || 'N/A'}`);
  console.log(`  - Total tokens: ${completion.usage?.total_tokens || 'N/A'}`);
}

basicRequest().catch(console.error);