import React from "react";

interface PainterConfigProps {
  gridSize: number;
  onChangeGridSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPainterActive: boolean;
  onClickPainterActive: () => void;
  isBrushSizeActive: boolean;
  onClickBrushSizeActive: () => void;
  brushSize: number;
  onChangeBrushSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PainterConfig: React.FC<PainterConfigProps> = ({
  gridSize,
  onChangeGridSize,
  isPainterActive,
  onClickPainterActive,
  isBrushSizeActive,
  onClickBrushSizeActive,
  brushSize,
  onChangeBrushSize,
}) => {
  return (
    <div className="bg-primary-button fixed top-16 right-20">
      
      <div className="bg-secundary-button px-2 mx-1 py-1 my-1 w-56">
        <div className="flex items-center">
          <h4 className="text-sm mb-1">Painter Size</h4>
          <p className="text-xs ml-2">def: 10</p>
        </div>
        <div className="flex mb-1">
          <input
            className="text-slate-700 mr-2 font-semibold w-1/6 text-center"
            value={gridSize}
            onChange={onChangeGridSize}
          />
          <input
            className="w-10/12"
            value={gridSize}
            type="range"
            onChange={onChangeGridSize}
            min={1}
            max={70}
          />
        </div>
      </div>
      
      <div className="bg-secundary-button px-2 mx-1 py-1 my-1 w-56">
        <h4 className="text-sm mb-1">Painter Style</h4>
        <div className="flex justify-around">
          <button
            className={`${isPainterActive ? 'border-2 border-blue-500' : ''}`}
            onClick={onClickPainterActive}
          >
            <img
              className="h-10"
              src="../images/canvas-icons/painter-style-canvas-icon.png"
              alt="painter tool"
            />
          </button>
          <button
            className={`${isBrushSizeActive ? 'border-2 border-blue-500' : ''}`}
            onClick={onClickBrushSizeActive}
          >
            <img
              className="h-10"
              src="../images/canvas-icons/brush-painter-style-canvas-icon.png"
              alt="brush tool"
            />
          </button>
        </div>
      </div>
      
      {isBrushSizeActive && (
        <div className="bg-secundary-button px-2 mx-1 py-1 my-1 w-56">
          <div className="flex items-center">
            <h4 className="text-sm mb-1">Brush Painter Size</h4>
            <p className="text-xs ml-2">def: 3</p>
          </div>
          <div className="flex mb-1">
            <input
              className="text-slate-700 mr-2 font-semibold w-1/6 text-center"
              value={brushSize}
              onChange={onChangeBrushSize}
            />
            <input
              className="w-10/12"
              value={brushSize}
              type="range"
              onChange={onChangeBrushSize}
              min={1}
              max={70}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PainterConfig;
