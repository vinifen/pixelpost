import React, { useRef, useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import { Link } from "react-router-dom";


const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#aabbcc");
  const [gridSize, setGridSize] = useState<number>(20);
  const canvasWidth = 4000;
  const canvasHeight = 4000;
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoHistory, setRedoHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      clearCanvas();
      
      // Salvando o estado inicial do canvas no history
      const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      setHistory([imageData]);
      setCurrentStep(0);
    }
  }, [canvasHeight, canvasWidth]);

  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        setHistory(prev => [...prev.slice(0, currentStep + 1), imageData]);
        setRedoHistory([]); // Clear redo history when new action is performed
        setCurrentStep(prev => prev + 1);
      }
    }
  }

  const undo = () => {
    setCurrentStep(prevStep => {
      if (prevStep <= 0) return prevStep; // Garante que não tente desfazer antes do primeiro passo
  
      const previousStep = prevStep - 1;
      const previousImageData = history[previousStep];
      const canvas = canvasRef.current;
  
      if (canvas && previousImageData) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.putImageData(previousImageData, 0, 0);
          setRedoHistory(prevRedo => [history[prevStep], ...prevRedo]); // Salva o estado atual no redoHistory
        }
      }
  
      return previousStep; // Atualiza para o passo anterior
    });
  };

  const redo = () => {
    if (redoHistory.length === 0) return;
  
    setCurrentStep(prevStep => {
      const nextStep = redoHistory[0];
      const canvas = canvasRef.current;
  
      if (canvas) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx && nextStep) {
          ctx.putImageData(nextStep, 0, 0);
          setHistory(prevHistory => [...prevHistory, nextStep]); // Adicionar o estado atual ao history
          setRedoHistory(prevRedo => prevRedo.slice(1)); // Remove o primeiro item do redoHistory
        }
      }
  
      return prevStep + 1; // Avança um passo no history
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [history, redoHistory, currentStep]);

  const paintPixel = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
  }

  const handlePainting = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if(isPaniterActive == true){ 
      console.log("bundinn")
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { willReadFrequently: true });

      if (!ctx) return;

      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / gridSize);
        const y = Math.floor((e.clientY - rect.top) / gridSize);
        paintPixel(x, y, ctx);
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(true);
    handlePainting(e);
    handleErasing(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isDrawing) {
      handlePainting(e);
      handleErasing(e);
    }
    console.log("urubu")
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    saveHistory();
    console.log("bunda")
  }

  /*const handleMouseLeave = () => {
    setIsDrawing(false);
  }*/

  console.log("sapo")
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if(!ctx) return; 
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Resetar history e currentStep após zerar o canvas
      setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]); // Registrar o canvas zerado como o primeiro estado
      setCurrentStep(0); // Reinicia para o passo 0
      setRedoHistory([]); // Limpa o redoHistory
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "pixel-art.png";
      link.click();
    }
  }
  const [isEraserActive, setEraserActive] = useState<boolean>(false);

  const [isColorPickerVisible, setColorPickerVisible] = useState<boolean>(false);
  const toggleColorPicker = () => {
    setColorPickerVisible(prev => !prev);
    if (isDimensionsVisible)
      setDimensionsVisible(prev => !prev);
  }

  const [isDimensionsVisible, setDimensionsVisible] = useState<boolean>(false);
  const toggleDimensions = () => {
    setDimensionsVisible(prev => !prev);
    if (isColorPickerVisible)
      setColorPickerVisible(prev => !prev);
  }
  const [isPaniterActive, setPaniterActive] = useState<boolean>(true);

  const handleActivePainter = () => {
    setEraserActive(false);
    setPaniterActive(true);
    console.log(isPaniterActive);
  }

  const handleMoveTool = () => {
    setEraserActive(false);
    setPaniterActive(prev => !prev);
    console.log(isPaniterActive);
  }

  const handleEraser = () => {
    setEraserActive(prev => !prev);
    setPaniterActive(false);
    console.log("cuzin" + isEraserActive)
  }


  
  

  const handleErasing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isEraserActive) { 
      console.log("cuzin" + isEraserActive)
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { willReadFrequently: true });
  
      if (!ctx) return;
  
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / gridSize);
        const y = Math.floor((e.clientY - rect.top) / gridSize);
        
        // Limpando (apagando) o pixel na posição (x, y)
        ctx.clearRect(x * gridSize, y * gridSize, gridSize, gridSize);
      }
    }
  };


  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="xxs:mx-1 sm:mx-3 flex justify-between">
        <div className="flex justify-start items-center">
          <Link to="/" className="p-1 sm:p-2 sm:pl-0 lg:p-3 xxs:px-3">
            <img className="h-10" src="../images/back-icon.png" alt="return to home" />
          </Link>
          <img className="h-10 mr-1" src="../images/logo-pixel-post.png" alt="" />
          <h1 className="hidden lg:block text-sm font-extrabold">PIXEL POST</h1>
        </div>
        <div className="hidden sm:flex justify-around md:mr-24">
          <button 
            className="p-1 sm:p-2 lg:p-3" 
            onClick={handleActivePainter}
          >
            <img className="h-10" src="../images/canvas-icons/pen-canvas-icon.png" alt="art tools" />
          </button>

          <button 
            className="flex items-center justify-center p-1 sm:p-2 lg:p-3"
            onClick={toggleColorPicker}
          >
            <div className="bg-[#6D6E74] h-10 w-10 flex items-center justify-center">
              <div
                style={{
                  backgroundColor: color,
                  width: '68%',
                  height: '68%',
                }}
              ></div>
            </div>
          </button>

          <button className="p-1 sm:p-2 lg:p-3" onClick={handleEraser}>
            <img className="h-10" src="../images/canvas-icons/eraser-canvas-icon.png" alt="eraser tool" />
          </button>
          <button className="p-1 sm:p-2 lg:p-3">
            <img 
            className="h-10" 
            src="../images/canvas-icons/move-canvas-icon.png" 
            alt="move tool" 
            onClick={handleMoveTool}
          />
          </button>
          <button
            className="sm:ml-3 md:ml-10 p-1 sm:p-2 lg:p-3"
            onClick={undo} // Chama `undo` diretamente
          >
            <img
              className="h-10"
              src="../images/canvas-icons/ctrl_z-canvas-icon.png"
              alt="undo tool"
            />
          </button>
        </div>

        <div>

          <button 
            className="p-1 sm:p-2 lg:p-3 xxs:px-3" 
            onClick={toggleDimensions}
          >
            <img className="h-10" src="../images/canvas-icons/dimension-canvas-icon.png" alt="dimension tool"/>
          </button>
          <button 
            className="p-1 sm:p-2 sm:pr-0 lg:p-3 xxs:px-3"
            onClick={downloadImage}
          >
            <img className="h-10" src="../images/canvas-icons/save-canvas-icon.png" alt="save tool" />
          </button>

        </div>
      </header>

      <main className="flex justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <div className="flex overflow-auto justify-center items-center w-[96vw] h-[70vh]">
            <canvas
              className="bg-canvas-background"
              ref={canvasRef}
              id="pixelCanvas"
              width={canvasWidth}
              height={canvasHeight}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              
            ></canvas>
          </div>
        </div>
      </main>

      <footer className="sm:hidden flex justify-around">
        <div className="flex items-center">
          <button className="p-1 xxs:px-3 sm:p-2 lg:p-3">
            <img className="h-10" src="../images/canvas-icons/pen-canvas-icon.png" alt="art tools" />
          </button>
          <button 
            className="p-1 xxs:px-3 sm:p-2 lg:p-3"
            onClick={toggleColorPicker}
          >
            <div className="bg-secundary-button h-10 w-10 flex items-center justify-center">
              <div
                style={{
                  backgroundColor: color,
                  width: '68%',
                  height: '68%',
                }}
              ></div>
            </div>
          </button>
          <button 
            className="p-1 xxs:px-3 sm:p-2 lg:p-3" 
            onClick={handleEraser}
          >
            <img className="h-10" src="../images/canvas-icons/eraser-canvas-icon.png" alt="eraser tool" />
          </button>
          <button className="p-1 xxs:px-3 sm:p-2 lg:p-3 mr-10">
            <img className="h-10" src="../images/canvas-icons/move-canvas-icon.png" alt="move tool" />
          </button>
          <button className="p-1 xxs:px-3 sm:p-2 lg:p-3">
            <img className="h-10" src="../images/canvas-icons/ctrl_z-canvas-icon.png" alt="undo tool" />
          </button>
        </div>
      </footer>

      {isColorPickerVisible && (
        <div className="fixed bottom-16 left-1/4 sm:top-16 sm:right-2/4 sm:left-auto sm:bottom-auto">
          <ColorPicker color={color} onChange={setColor} />
        </div>
      )}

      {isDimensionsVisible && (
        <div className="bg-primary-button fixed top-16 right-20">
          <div className="bg-secundary-button px-2 mx-1 py-1 my-1">
            <h4 className="text-sm mb-1">Grid Size</h4>
            <div className="flex mb-1">
              <div className="bg-white text-slate-700 flex items-center px-2 mr-2 font-semibold">
                {gridSize}
              </div>

              <input 
                type="range" 
                onChange={(e) => setGridSize(Number(e.target.value))} 
                min={1}
                max={70}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  ); 
}

export default Canvas;
