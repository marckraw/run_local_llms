// Test GPT-OSS using direct Ollama API with streaming

async function testLocalGPT() {
  console.log('🤖 GPT-OSS (streaming): ');
  
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-oss:20b',
      prompt: 'Write a haiku about programming',
      stream: true  // Enable streaming
    })
  });

  // Read the stream
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullThinking = '';
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    // Each chunk is a JSON object on its own line
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        
        // Print the response as it streams
        if (data.response) {
          process.stdout.write(data.response);
        }
        
        // Collect thinking for later
        if (data.thinking) {
          fullThinking = data.thinking;
        }
        
        // Check if done
        if (data.done) {
          console.log('\n\n💭 Model thinking:', fullThinking);
          console.log('\n✅ Stream complete!');
        }
      } catch (e) {
        // Skip invalid JSON lines
      }
    }
  }
}

testLocalGPT().catch(console.error);