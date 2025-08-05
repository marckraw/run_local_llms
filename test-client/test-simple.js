// Simple request to GPT-OSS without OpenAI SDK

async function simpleRequest() {
  console.log('📝 Simple Direct Request to GPT-OSS\n');
  console.log('=' .repeat(50));
  
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-oss:20b',
      prompt: 'What is Node.js in one sentence?',
      stream: false
    })
  });

  const data = await response.json();
  
  console.log('\n✅ Response:', data.response);
  console.log('\n💭 Thinking:', data.thinking);
  console.log('\n📊 Stats:');
  console.log(`  - Total duration: ${(data.total_duration / 1e9).toFixed(2)}s`);
}

simpleRequest().catch(console.error);