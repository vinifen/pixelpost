import React, { RefObject, useState} from 'react';
import CanvasContext from './CanvasContext';



const PaintTools = (canvasRef: RefObject<HTMLCanvasElement>) => { 
  
  const [GridSize, SetGridSize] = useState<number>(10);
  const [BrushSize, SetBrushSize] = useState<number>(12);
  const [Color, SetColor] = useState("#aabbcc");
  
  const getGridCoordinates = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / GridSize);
    const y = Math.floor((e.clientY - rect.top) / GridSize);
    return { x, y };
  };
  
  const PainterTool = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const ctx = CanvasContext(canvasRef);
    if (!ctx) return;
    
    const { x, y } = getGridCoordinates(e);
    
    ctx.fillStyle = Color;
    ctx.fillRect(x * GridSize, y * GridSize, GridSize, GridSize);
  }
  
  const BrushPainterTool = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const ctx = CanvasContext(canvasRef);
    if (!ctx) return;
    
    const { x, y } = getGridCoordinates(e);
    
    for (let i = -BrushSize; i <= BrushSize; i++) {
      for (let j = -BrushSize; j <= BrushSize; j++) {
        if (i * i + j * j <= (BrushSize / 5) * (BrushSize / 5)) {
          ctx.fillStyle = Color;
          ctx.fillRect((x + i) * GridSize, (y + j) * GridSize, GridSize, GridSize);
        }
      }
    }
  }
  
  const EraserTool = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const ctx = CanvasContext(canvasRef);
    if (!ctx) return;
    
    const { x, y } = getGridCoordinates(e);
    
    ctx.clearRect(x * GridSize, y * GridSize, GridSize, GridSize);
  }
  
  const BrushEraserTool = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const ctx = CanvasContext(canvasRef);
    if (!ctx) return;
    
    const { x, y } = getGridCoordinates(e);
    
    ctx.clearRect(x * GridSize, y * GridSize, GridSize, GridSize);
  }
  
  return {
    PainterTool, 
    BrushPainterTool, 
    BrushEraserTool, 
    EraserTool, 
    SetGridSize, 
    SetColor, 
    SetBrushSize, 
    Color, 
    BrushSize, 
    GridSize
  };
}

export default PaintTools;

