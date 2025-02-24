import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";

export default function Authentication() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleToggle = () => {
    setIsLogin(prev => !prev);
  };

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="mt-5 mx-8 sm:mt-12 sm:mx-12">
        <Link to="/" className="flex items-center h-10 w-10">
          <img src="./images/back-icon.png" alt="Back to home" className="h-full" />
        </Link>
      </header>
      <main className="flex flex-col justify-start items-center mt-12 lg:mt-20">
        {isLogin ? (
          <Login onClickChangeAuth={handleToggle} />
        ) : (
          <Register onClickChangeAuth={handleToggle} />
        )}
      </main>
    </div>
  );
}
