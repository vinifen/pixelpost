import { RefObject } from "react";

const CanvasContext = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  if (!canvas) return null;
  return canvas.getContext('2d', { willReadFrequently: true });
}

export default CanvasContext;