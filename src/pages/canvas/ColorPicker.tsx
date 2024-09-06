import React from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerTyping {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerTyping> = ({ color, onChange }) => {

  const colors = [
    { name: 'red-500', hex: '#EF4444' },
    { name: 'blue-500', hex: '#3B82F6' },
    { name: 'green-500', hex: '#10B981' },
    { name: 'orange-300', hex: '#DEB081' },
    { name: 'black', hex: '#000000' },
    { name: 'orange-500', hex: '#F97316' },
    { name: 'pink-500', hex: '#EC4899' },
    { name: 'teal-500', hex: '#14B8A6' },
    { name: 'orange-900', hex: '#7c2d12' },
    { name: 'white', hex: '#FFFFFF' }
  ];

  return (
    <div className='flex justify-between'>
      <HexColorPicker
        className='sm:p-0'
        color={color}
        onChange={onChange}
      />
      <div className='bg-dark-blue-gradient h-50 w-40'>
        <div className='grid grid-cols-5 h-full w-full px-1 py-1'>
          {colors.map((colorObj) => (
            <div
              key={colorObj.name}
              className={`h-full w-full flex justify-center items-center`}
              onClick={() => onChange(colorObj.hex)}
            >
              <div
                className={`h-3/4 w-3/4`}
                style={{ backgroundColor: colorObj.hex }} // Aplica a cor usando CSS inline
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
