import React from 'react';

interface MaxTokensSliderProps {
  model: string;
  onChange: (maxTokens: number) => void;
}

const MaxTokensSlider: React.FC<MaxTokensSliderProps> = ({ model, onChange }) => {
  const maxTokensRange = models[model].tokens;
  const [maxTokens, setMaxTokens] = useState(Math.min(32768, maxTokensRange));

  const handleMaxTokensChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxTokens = parseInt(event.target.value, 10);
    setMaxTokens(maxTokens);
    onChange(maxTokens);
  };

  return (
    <div>
      <label>
        Max Tokens:
        <input
          type="range"
          min={512}
          max={maxTokensRange}
          value={maxTokens}
          onChange={handleMaxTokensChange}
        />
        <span>{maxTokens}</span>
      </label>
    </div>
  );
};

export default MaxTokensSlider;
