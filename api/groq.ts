import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const groqApiKey = process.env.GROQ_API_KEY;
const groqApiUrl = process.env.GROQ_API_URL;

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
        const headers = {
          'Authorization': `Bearer ${groqApiKey}`,
        };

        const response = await axios.post(`${groqApiUrl}/chat/completions`, params, { headers });
        return response.data;
      },
    },
  },
};

export default groqClient;
