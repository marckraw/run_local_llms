// See GPT-OSS's reasoning process (thinking tokens)

async function showThinking() {
  console.log('🧠 GPT-OSS Reasoning Demo\n');
  console.log('This shows the model\'s internal thinking process!\n');
  console.log('=' .repeat(60));
  
  const prompt = 'If I have 3 apples and buy 5 more, then give away 2, how many do I have?';
  
  console.log('\n📝 QUESTION:', prompt);
  console.log('\n' + '=' .repeat(60));
  
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-oss:20b',
      prompt: prompt,
      stream: false  // Non-streaming to get complete thinking
    })
  });

  const data = await response.json();
  
  console.log('\n💭 MODEL\'S INTERNAL THINKING:');
  console.log('-'.repeat(60));
  console.log(data.thinking || 'No thinking tokens available');
  
  console.log('\n' + '=' .repeat(60));
  console.log('\n✅ FINAL ANSWER:');
  console.log('-'.repeat(60));
  console.log(data.response);
  
  console.log('\n' + '=' .repeat(60));
  console.log('\n📊 This is unique to GPT-OSS - you can see HOW it thinks!');
}

showThinking().catch(console.error);