import React, { useState } from 'react';

const ColorPicker = ({ onColorChange, defaultColor = '#000000' }) => {
  console.log('ColorPicker component loaded');
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    if (onColorChange) {
      onColorChange(newColor);
    }
  };

  const presetColors = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFA500',
    '#800080',
    '#008000',
    '#000080',
    '#808080',
    '#000000',
  ];

  return (
    <div className="color-picker">
      <div className="color-input-container flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-full border overflow-hidden"
          style={{ backgroundColor: selectedColor }}
        >
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="color-input opacity-0 w-full h-full cursor-pointer"
          />
        </div>

        <input
          type="text"
          value={selectedColor}
          onChange={handleColorChange}
          className="color-text-input rounded-md border"
          placeholder="#000000 text-sm"
        />
      </div>
      <div className="preset-colors">
        {presetColors.map((color) => (
          <div
            key={color}
            className="preset-color"
            style={{ backgroundColor: color }}
            onClick={() => {
              setSelectedColor(color);
              if (onColorChange) {
                onColorChange(color);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
