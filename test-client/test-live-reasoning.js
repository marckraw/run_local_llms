// Stream BOTH reasoning and content in real-time using OpenAI SDK!

import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
});

async function streamWithLiveReasoning() {
  console.log('🧠 GPT-OSS Live Reasoning + Response\n');
  console.log('Watch the model think AND respond in real-time!\n');
  console.log('=' .repeat(60));
  
  const stream = await openai.chat.completions.create({
    model: 'gpt-oss:20b',
    messages: [
      { role: 'system', content: 'You are a helpful coding assistant.' },
      { role: 'user', content: 'Write a JavaScript function to reverse a string. Think through different approaches first.' }
    ],
    stream: true,
  });

  let reasoningStarted = false;
  let contentStarted = false;
  
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta;
    
    // Check for reasoning tokens (thinking)
    if (delta?.reasoning) {
      if (!reasoningStarted) {
        console.log('\n💭 THINKING (live):\n');
        console.log('\x1b[33m'); // Yellow for thinking
        reasoningStarted = true;
      }
      process.stdout.write(delta.reasoning);
    }
    
    // Check for content tokens (actual response)
    if (delta?.content) {
      if (!contentStarted) {
        if (reasoningStarted) {
          console.log('\x1b[0m'); // Reset color
        }
        console.log('\n\n' + '=' .repeat(60));
        console.log('\n✅ RESPONSE (streaming):\n');
        console.log('\x1b[36m'); // Cyan for response
        contentStarted = true;
      }
      process.stdout.write(delta.content);
    }
  }
  
  console.log('\x1b[0m'); // Reset color
  console.log('\n\n' + '=' .repeat(60));
  console.log('\n🎉 You just watched the model think AND respond in real-time!');
  console.log('    Reasoning comes first, then the response streams.');
}

streamWithLiveReasoning().catch(console.error);