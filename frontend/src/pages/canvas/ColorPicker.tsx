import React from 'react';
import {HexColorPicker} from 'react-colorful';

interface ColorPickerTyping {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerTyping> = ({ color, onChange }) => {

  const colors = [
    { name: 'slate-50', hex: '#f8fafc' },   
    { name: 'slate-300', hex: '#cbd5e1' },  
    { name: 'stone-700', hex: '#64748b' }, 
    { name: 'slate-900', hex: '#44403c' }, 
    { name: 'black', hex: '#000000' },      
    { name: 'amber-500', hex: '#f59e0b' },
    { name: 'orange-500', hex: '#f97316'},  
    { name: 'red-500', hex: '#ef4444'},   
    { name: 'red-700', hex: '#b91c1c' }, 
    { name: 'orange-950', hex: '#431407' },      
    { name: 'lime-300', hex: '#bef264' }, 
    { name: 'green-500', hex: '#22c55e' }, 
    { name: 'lime-600', hex: '#65a30d' },   
    { name: 'cyan-600', hex: '#0891b2'  }, 
    { name: 'green-950', hex: '#052e16'},   
    { name: 'rose-500', hex: '#F43F5E'},   
    { name: 'blue-500', hex: '#3b82f6' }, 
    { name: 'violet-500', hex: '#A78BFA' }, 
    { name: 'fuchsia-600', hex: '#1995FF' },  
    { name: 'blue-950', hex: '#2896FF'}    
  ];

  return (
    <div className='flex justify-between'>
      <HexColorPicker
        className='sm:p-0'
        color={color}
        onChange={onChange}
      />
      <div className='bg-dark-blue-gradient h-50 w-36 xxs:w-40 xs:w-44'>
        <div className='grid grid-cols-5 h-full w-full px-1 xs:px-2 py-1'>
          {colors.map((colorObj) => (
            <div
              key={colorObj.name}
              className={`h-full w-full flex justify-center items-center`}
              onClick={() => onChange(colorObj.hex)}
            >
              <div
                className={`h-4/5 w-4/5`}
                style={{ backgroundColor: colorObj.hex }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
