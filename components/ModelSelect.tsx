import React, { useState } from 'react';
import models from '../api/models';

interface ModelSelectProps {
  onChange: (model: string) => void;
}

const ModelSelect: React.FC<ModelSelectProps> = ({ onChange }) => {
  const [selectedModel, setSelectedModel] = useState(Object.keys(models)[0]);

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel);
    onChange(selectedModel);
  };

  return (
    <select value={selectedModel} onChange={handleModelChange}>
      {Object.keys(models).map((model) => (
        <option key={model} value={model}>
          {models[model].name}
        </option>
      ))}
    </select>
  );
};

export default ModelSelect;
