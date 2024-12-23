import { useState, RefObject, useEffect } from "react";
import CanvasContext from "./CanvasContext";

const HistoryManagement = (canvasRef: RefObject<HTMLCanvasElement>, canvasWidth: number, canvasHeight: number) => {
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoHistory, setRedoHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {  
    const ctx = CanvasContext(canvasRef);
    if (ctx) {
      const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      setHistory([imageData]);
      setCurrentStep(0);
    }
  },[]);
  
  const SaveHistory = () => {
    const ctx = CanvasContext(canvasRef);
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        setHistory(prev => [...prev.slice(0, currentStep + 1), imageData]);
        setRedoHistory([]);
        setCurrentStep(prev => prev + 1);
      }
  }
  
  const Undo = () => {
    setCurrentStep(prevStep => {
      if (prevStep <= 0) return prevStep;
      
      const previousStep = prevStep - 1;
      const previousImageData = history[previousStep];
      const ctx = CanvasContext(canvasRef);
        if (ctx) {
          ctx.putImageData(previousImageData, 0, 0);
          setRedoHistory(prevRedo => [history[prevStep], ...prevRedo]);
        }
      return previousStep;
    });
  }
  
  
  const Redo = () => {
    if (redoHistory.length === 0) return;
    
    setCurrentStep(prevStep => {
      const nextStep = redoHistory[0];
      const ctx = CanvasContext(canvasRef);
        if (ctx && nextStep) {
          ctx.putImageData(nextStep, 0, 0);
          setHistory(prevHistory => [...prevHistory, nextStep]);
          setRedoHistory(prevRedo => prevRedo.slice(1)); 
        }
      return prevStep + 1;
    });
  }

  const Do = () => {
    const ctx = CanvasContext(canvasRef);
    if(ctx){
      ctx.putImageData(history[currentStep], 0, 0);
    }
    console.log("arros" + currentStep);
  }
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        Undo();
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        Redo();
      }
    }
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [history, currentStep]);
  
  return { SaveHistory, Undo, Do,}
}

export default HistoryManagement;
