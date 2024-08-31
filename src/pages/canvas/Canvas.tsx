import { Link } from "react-router-dom";

export default function Canvas(){
  return ( 
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="mx-1 sm:mx-3 flex justify-between">
        <div className="flex justify-start items-center lg:pr-40">
          <Link to="/" className="">
            <img className="h-10"  src="../images/back-icon.png" alt="return to home" />
          </Link>
          <img className="h-10 ml-2 sm:ml-5 mr-1" src="../images/logo-pixel-post.png" alt="" />
          <h1 className="text-sm">PIXEL POST</h1>
        </div>
        <div className="hidden sm:flex justify-around">
          <button className="p-1 md:p-2 lg:p-3">
            <img className="h-10"  src="../images/canvas-icons/pen-canvas-icon.png" alt="art tools" />
          </button>
          <button className="p-1 md:p-2 lg:p-3">
            <img className="h-10"  src="../images/canvas-icons/colors-canvas-icon.png" alt="colors tool" />
          </button>
          <button className="p-1 md:p-2 lg:p-3">
            <img className="h-10"  src="../images/canvas-icons/eraser-canvas-icon.png" alt="eraser tool" />
          </button>
          <button className="p-1 md:p-2 lg:p-3">
            <img className="h-10"  src="../images/canvas-icons/move-canvas-icon.png" alt="return to home" />
          </button>
        </div>
        <button className="hidden sm:block p-1 md:p-2 lg:p-3">
            <img className="h-10"  src="../images/canvas-icons/ctrl_z-canvas-icon.png" alt="return to home" />
        </button>
        <div>
          <button className="p-1 md:p-2 lg:p-3">
            <img className="h-10"  src="../images/canvas-icons/dimension-canvas-icon.png" alt="return to home" />
          </button>
          <button className="p-1 md:p-2 lg:p-3">
            <img className="h-10"  src="../images/canvas-icons/save-canvas-icon.png" alt="return to home" />
          </button>
        </div>
      </header>
      <main className="flex justify-center items-center">
        <div className="overflow-auto w-full h-full max-w-[calc(90vw)] max-h-[calc(80vh)]">
          <canvas
            className="bg-white"
            id="pixelCanvas"
            width="5000"
            height="5000"
          ></canvas>
        </div>
      </main>
      <footer className="sm:hidden">
        aaaa
      </footer>
    </div>
  ); 
}