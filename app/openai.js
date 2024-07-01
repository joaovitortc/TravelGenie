// api.js
import config from '../config'; 

const API_KEY = config.OPEN_API_KEY

console.log("API KEY:", API_KEY);
const endpoint = 'https://api.openai.com/v1/chat/completions';

const callOpenAI = async (prompt) => {
    try {
      console.log("OpenAi being called with prompt: ", prompt);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o', // Using the GPT-4o model
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
    const data = await response.json();
    //console.log(data.choices[0].message.content); // Example: Log the generated text
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default callOpenAI;