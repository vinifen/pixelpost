import React from "react";
interface DimensionsProps {
  valueCanvasHeight: number;
  onChangeCanvasHeight: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valueCanvasWidth: number;
  onChangeCanvasWidht: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Dimensions: React.FC<DimensionsProps> = ({
    valueCanvasHeight, 
    onChangeCanvasHeight, 
    valueCanvasWidth, 
    onChangeCanvasWidht,
}) => {
return ( 
  <div className="bg-primary-button fixed top-16 right-20">
    <div className="bg-secundary-button px-2 mx-1 py-1 my-1 w-56">
      <p className="text-xs">be careful, this will erase your drawing</p></div>
      <div className="bg-secundary-button px-2 mx-1 py-1 my-1 w-56">
        <div className="flex flex-wrap items-center">
          <h4 className="text-sm mb-1">Canvas Height</h4>
          <p className="text-xs ml-2">def: 800</p>
          
        </div>
        <div className="flex mb-1">
          
          <input className="text-slate-700 mr-2 font-semibold w-1/6 text-center"
            value={valueCanvasHeight}
            onChange={onChangeCanvasHeight}
            min={10}
            max={1440}
          >
            
          </input>
          
          <input 
            className="w-10/12"
            value={valueCanvasHeight}
            type="range" 
            onChange={onChangeCanvasHeight} 
            min={10}
            max={1440}
          />
      </div>
    </div>

    <div className="bg-secundary-button px-2 mx-1 py-1 my-1 w-56">
      <div className="flex items-center">
        <h4 className="text-sm mb-1">Canvas Width</h4>
        <p className="text-xs ml-2">def: 800</p>
      </div>
      <div className="flex mb-1">
        
        <input className="text-slate-700 mr-2 font-semibold w-1/6 text-center"
          value={valueCanvasWidth}
          onChange={onChangeCanvasWidht}
          min={10}
          max={2560}
        >
          
        </input>
        
        <input 
          className="w-10/12"
          value={valueCanvasWidth}
          type="range" 
          onChange={onChangeCanvasWidht} 
          min={10}
          max={2560}
        />
      </div>
    </div>
  </div>
  )
}

export default Dimensions;