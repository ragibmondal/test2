import React, { useState, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ModelSelect from './ModelSelect';
import MaxTokensSlider from './MaxTokensSlider';
import groqClient from '../api/groq';

interface AppState {
  messages: {
    role: string;
    content: string;
  }[];
  selectedModel: string;
  maxTokens: number;
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    messages: [],
    selectedModel: Object.keys(models)[0],
    maxTokens: Math.min(32768, models[Object.keys(models)[0]].tokens),
  });

  useEffect(() => {
    const handleModelChange = (model: string) => {
      setAppState((prevAppState) => ({ ...prevAppState, selectedModel: model }));
    };

    const handleMaxTokensChange = (maxTokens: number) => {
      setAppState((prevAppState) => ({ ...prevAppState, maxTokens }));
    };

    const handleSendMessage = async (prompt: string) => {
      const { selectedModel, maxTokens } = appState;
      const messages = [...appState.messages, { role: 'user', content: prompt }];

      try {
        const chatCompletion = await groqClient.chat.completions.create({
          model: selectedModel,
          messages,
          maxTokens,
          stream: true,
        });

        const chatResponses = [];
        for await (const chunk of chatCompletion) {
          if (chunk.choices[0].delta.content) {
            chatResponses.push(chunk.choices[0].delta.content);
          }
        }

        const fullResponse = chatResponses.join('\n');
        setAppState((prevAppState) => ({
          ...prevAppState,
          messages: [...prevAppState.messages, { role: 'assistant', content: fullResponse }],
        }));
      } catch (error) {
        console.error(error);
      }
    };

    return () => {
      // cleanup
    };
  }, []);

  return (
    <div>
      <h1>Groq Chat App</h1>
      <ModelSelect onChange={handleModelChange} />
      <MaxTokensSlider model={appState.selectedModel} onChange={handleMaxTokensChange} />
      <input
        type="text"
        placeholder="Enter your prompt here..."
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleSendMessage(event.target.value);
            event.target.value = '';
          }
        }}
      />
      {appState.messages.map((message, index) => (
        <ChatMessage key={index} role={message.role} content={message.content} avatar={message.role === 'assistant' ? '🤖' : '👨‍💻'} />
      ))}
    </div>
  );
};

export default App;
