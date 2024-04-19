import axios from 'axios';

interface ChatCompletion {
  choices: {
    delta: {
      content: string;
    };
  }[];
}

interface GroqClient {
  chat: {
    completions: {
      create: (params: {
        model: string;
        messages: {
          role: string;
          content: string;
        }[];
        maxTokens: number;
        stream: boolean;
      }) => Promise<ChatCompletion>;
    };
  };
}

const groqClient: GroqClient = {
  chat: {
    completions: {
      create: async (params) => {
        const response = await axios.post('https://api.groq.com/v1/chat/completions', params);
        return response.data;
      },
    },
  },
};

export default groqClient;
