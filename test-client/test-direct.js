// Test GPT-OSS using direct Ollama API

async function testLocalGPT() {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-oss:20b',
      prompt: 'What is TypeScript in one sentence?',
      stream: false
    })
  });

  const data = await response.json();
  console.log('Response:', data.response);
  console.log('\nThinking:', data.thinking); // GPT-OSS shows its thinking!
}

testLocalGPT().catch(console.error);