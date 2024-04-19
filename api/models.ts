interface Model {
  name: string;
  tokens: number;
  developer: string;
}

const models: { [key: string]: Model } = {
  'mixtral-8x7b-32768': {
    name: 'Mixtral-8x7b-Instruct-v0.1',
    tokens: 32768,
    developer: 'Mistral',
  },
  'llama2-70b-4096': {
    name: 'LLaMA2-70b-chat',
    tokens: 4096,
    developer: 'Meta',
  },
  'gemma-7b-it': {
    name: 'Gemma-7b-it',
    tokens: 8192,
    developer: 'Google',
  },
};

export default models;
