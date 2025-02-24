import React, { useRef, useState } from "react";
import ColorPicker from "./ColorPicker";
import { Link } from "react-router-dom";
import PaintTools from "./PaintTools";
import HistoryManagement  from "./HistoryManagement";
import { DownloadCanvas, UploadCanvas } from "./DownloadControl";
import LoggedIn from "../../components/LoggedIn";
import Dimensions from "./Dimensions";
import PainterConfig from "./PainterConfig";

interface UploadResult {
  status: boolean;
  message: string;
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState<number>(800);
  const [canvasHeight, setCanvasHeight] = useState<number>(800);
  
  const [isEraserEnable, setEraserEnable] = useState<boolean>(false);

  const [isPainterEnable, setPainterEnable] = useState<boolean>(true);
  const [isDownloadVisible, setDownloadVisible] = useState<boolean>(false);
  const [isMoveToolEnable, setMoveToolEnable] = useState<boolean>(false);
  
  const [isColorPickerVisible, setColorPickerVisible] = useState<boolean>(false);
  const [isDimensionsVisible, setDimensionsVisible] = useState<boolean>(false);
  const [isPainterConfigVisible, setPainterConfigVisible] = useState<boolean>(false);
  const [isBrushSizeEnable, setBrushSizeEnable] = useState<boolean>(false);

  const [resultUpload, setResultUpload] = useState<UploadResult>({status: true, message: ""});
  const [isFeedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  
  const { 
    SaveHistory, 
    Undo, 
    Do,
  } = HistoryManagement(canvasRef, canvasWidth, canvasHeight);
  
  const {
    PainterTool, 
    BrushPainterTool, 
    EraserTool, 
    SetGridSize, 
    SetColor, 
    SetBrushSize, 
    Color, 
    BrushSize, 
    GridSize
  } = PaintTools(canvasRef);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(true);
    if (isBrushSizeEnable == true && isEraserEnable == true) {
      EraserTool(e);
    } else if (isBrushSizeEnable) {
      BrushPainterTool(e);
    } else if (isPainterEnable) {
      PainterTool(e);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isDrawing) {
      if (isBrushSizeEnable) {
        BrushPainterTool(e);
      } else if (isPainterEnable) {
        PainterTool(e);
      } else if (isEraserEnable){
        EraserTool(e);
      }
    }
  };
  
  const handleMouseUp = () => {
    setIsDrawing(false);
    SaveHistory();
  };
  
  const handleMouseLeave = () => {
    if (isDrawing) setIsDrawing(false);
  };
  
  const handleActiveColorPicker = () => {
    setColorPickerVisible(prev => !prev);
    if (isDimensionsVisible) setDimensionsVisible(false);
  };
  
  const handleActiveSave = () => {
    setDownloadVisible(prev => !prev);
    setDimensionsVisible(false);
    setPainterConfigVisible(false);
  };
  
  const handleActiveDimensions = () => {
    setDimensionsVisible(prev => !prev);
    setDownloadVisible(false);
    setPainterConfigVisible(false);
  };
  
  const handleActivePainter = () => {
    setBrushSizeEnable(false);
    setPainterEnable(true);
    setEraserEnable(false);
  };
  
  const handleMoveTool = () => {
    if(!isMoveToolEnable){
      setMoveToolEnable(true);
      setPainterEnable(false);
      setBrushSizeEnable(false);
      setEraserEnable(false);
    }
    else{
      setMoveToolEnable(false);
      setPainterEnable(true);
      setBrushSizeEnable(false);
      setEraserEnable(false);
    }
  };
  
  const handleEraser = () => {
    if (!isEraserEnable) { 
      setEraserEnable(true);  
      setBrushSizeEnable(false);
      setPainterEnable(false); 
      setMoveToolEnable(false);
    } else {
      setEraserEnable(false);
      setPainterEnable(true);  
      setBrushSizeEnable(false);  
    }
  };
  
  const handleActivePainterConfig = () => {
    setPainterConfigVisible(prev => !prev);
    setDownloadVisible(false);
    setDimensionsVisible(false);
  };
  
  const handleActiveBrushSize = () => {
    setBrushSizeEnable(prev => !prev);
    setPainterEnable(prev => !prev);
    setEraserEnable(false);
    console.log(isBrushSizeEnable);
  };

  const handleCanvasWidht = (e: React.ChangeEvent<HTMLInputElement>) => {
    let canvasWidhtValue = Number(e.target.value)
    if(canvasWidhtValue >= 2560){
      canvasWidhtValue = 2560;
    }
    setCanvasWidth(canvasWidhtValue); 
    Do();
  }
  const handleCanvasHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    let canvasHeightValue = Number(e.target.value)
    if(canvasHeightValue >= 1440){
      canvasHeightValue = 1440;
    }
    setCanvasHeight(canvasHeightValue);
    Do();
  }


  const handleUpload = async () => {
    setFeedbackVisible(true);
    const isLogged = await LoggedIn();
    if(isLogged){   
      const resultSubmitUpload: UploadResult = await UploadCanvas(canvasRef);
      if(resultSubmitUpload){ 
        
        setResultUpload(resultSubmitUpload);
        setTimeout(() => {
          setFeedbackVisible(false);
        }, 12000);
      }else{
        setResultUpload({status: false, message: "Upload error"});
      }
    }else{
      setResultUpload({status: false, message: "You must be logged in to upload"});
    }
  }
  
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
        <div className="hidden sm:flex justify-around lg:mr-24">
          
          
          <button 
            className="flex items-center justify-center p-1 sm:p-2 lg:p-3"
            onClick={handleActiveColorPicker}
          >
            <div 
              className={
                `bg-secundary-button h-10 w-10 flex items-center justify-center 
                ${isColorPickerVisible ? 'border-2 border-blue-500' : ''}`
              }
            >
              <div
                style={{
                  backgroundColor: Color,
                  width: '68%',
                  height: '68%',
                }}
              ></div>
            </div>
          </button>
          
          <button 
            className="p-1 sm:p-2 lg:p-3" 
            onClick={handleEraser}
          >
            <img 
              className={`h-10 ${isEraserEnable ? 'border-2 border-blue-500' : ''}`}
              src="../images/canvas-icons/eraser-canvas-icon.png" 
              alt="eraser tool" />
          </button>
          <button 
            className="p-1 sm:p-2 lg:p-3"
            onClick={handleMoveTool}
          >
            <img 
            className={`h-10 ${isMoveToolEnable ? 'border-2 border-blue-500' : ''}`}
            src="../images/canvas-icons/move-canvas-icon.png" 
            alt="move tool" 
            />
          </button>
          <button
            className="sm:ml-3 md:ml-10 p-1 sm:p-2 lg:p-3"
            onClick={Undo}
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
            onClick={handleActivePainterConfig}
          >
            <img 
              className={`h-10 ${isPainterConfigVisible ? 'border-2 border-blue-500' : ''}`}
              src="../images/canvas-icons/pen-canvas-icon.png" 
              alt="art tools" 
            />
          </button>

          <button 
            className="p-1 sm:p-2 lg:p-3 xxs:px-3" 
            onClick={handleActiveDimensions}
          >
            <img 
              className={`h-10 ${isDimensionsVisible ? 'border-2 border-blue-500' : ''}`}
              src="../images/canvas-icons/dimension-canvas-icon.png" 
              alt="dimension tool"
            />
          </button>
          <button 
            className="p-1 sm:p-2 lg:p-3 xxs:px-3"
            onClick={handleActiveSave}
          >
            <img 
              className={`h-10 ${isDownloadVisible ? 'border-2 border-blue-500' : ''}`}
              src="../images/canvas-icons/save-canvas-icon.png" 
              alt="save tool"
            />
          </button>
          
        </div>
      </header>
      
      <main className="flex justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <div 
            className="flex overflow-auto justify-center items-center w-[96vw] h-[80vh] sm:h-[90vh]"
          >
            <canvas
              className="bg-canvas-background"
              ref={canvasRef}
              id="pixelCanvas"
              width={canvasWidth}
              height={canvasHeight}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            ></canvas>
          </div>
        </div>
      </main>
      
      <footer className="sm:hidden flex justify-around">
        <div className="flex items-center">
          
          <button 
            className="p-1 xxs:px-3 sm:p-2 lg:p-3"
            onClick={handleActiveColorPicker}
          >
            <div 
              className={
                `bg-secundary-button h-10 w-10 flex items-center justify-center 
                ${isColorPickerVisible ? 'border-2 border-blue-500' : ''}`
              }
            >
              <div
                style={{
                  backgroundColor: Color,
                  width: '68%',
                  height: '68%',
                }}
              ></div>
            </div>
          </button>
          <button 
            className="p-2 xxs:px-3 sm:p-2 lg:p-3" 
            onClick={handleEraser}
          >
            <img 
              className={`h-10 ${isEraserEnable ? 'border-2 border-blue-500' : ''}`}
              src="../images/canvas-icons/eraser-canvas-icon.png" 
              alt="eraser tool"
            />
          </button>
          <button 
            className="p-1 xxs:px-3 sm:p-2 lg:p-3 mr-10"
            onClick={handleMoveTool}
          >
            <img 
              className={`h-10 ${isMoveToolEnable ? 'border-2 border-blue-500' : ''}`}
              src="../images/canvas-icons/move-canvas-icon.png" 
              alt="move tool"
            />
          </button>
          <button 
            className="p-1 xxs:px-3 sm:p-2 lg:p-3" 
            onClick={Undo}
          >
            <img className="h-10" src="../images/canvas-icons/ctrl_z-canvas-icon.png" alt="undo tool" />
          </button>
        </div>
      </footer>

      {isColorPickerVisible && (
        <div className="fixed bottom-16 left-5 xxs:ml-1/10 xxs:mr-2/10 xs:mx-15 sm:top-16 md:right-1/4 sm:left-auto sm:bottom-auto sm:right-10 ">
          <ColorPicker color={Color} onChange={SetColor} />
        </div>
      )}
      
      {isDimensionsVisible && (
        <Dimensions
          valueCanvasHeight={canvasHeight}
          onChangeCanvasHeight={handleCanvasHeight}
          valueCanvasWidth={canvasWidth}
          onChangeCanvasWidht={handleCanvasWidht}
        />
      )}

      {isDownloadVisible && (
        <div className="bg-primary-button fixed top-16 right-4 w-44">
          <div className="bg-secundary-button text-center m-1 mb-2 py-2">
            <button 
              className="text-sm" 
              onClick={() => DownloadCanvas(canvasRef)}
            >
              Download
            </button>
          </div>
          <div className="bg-secundary-button text-center m-1 mt-2 py-2">
            <button 
              className="text-sm"
              onClick={handleUpload}
            >
              Login and Save
            </button>
          </div>
          {isFeedbackVisible && (
            <>
            <div className={`text-center m-1 mt-2 py-2 border-2 border-secundary-button  ${resultUpload.status  == true ? "bg-blue-500" : "bg-red-500"}`}>
              <p className="break-words mx-1 text-sm">
                {resultUpload.message}
              </p>
            </div>
            </>
          )}
        </div>
      )}

      {isPainterConfigVisible && (
        <PainterConfig
        gridSize={GridSize}
        onChangeGridSize={(e) => SetGridSize(Number(e.target.value))}
        isPainterActive={isPainterEnable}
        onClickPainterActive={handleActivePainter}
        isBrushSizeActive={isBrushSizeEnable}
        onClickBrushSizeActive={handleActiveBrushSize}
        brushSize={BrushSize}
        onChangeBrushSize={(e) => SetBrushSize(Number(e.target.value))}
      />
      )}
    </div>
  ); 
}

export default Canvas;
