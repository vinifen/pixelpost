import { useNavigate } from "react-router-dom"
import SubmitLogin from "./SubmitLogin";
import React, { FormEvent, useState } from "react";

interface onClickChangeAuth {
  onClickChangeAuth: () => void;
}

const Login: React.FC<onClickChangeAuth> = ({onClickChangeAuth}) => {

  interface AuthResult {
    status: boolean;
    message: string;
  }

  const [usernameLogin, setUsernameLogin] = useState<string>('');
  const [passwordLogin, setPasswordLogin] = useState<string>('');
  const [rememberLogin, setRememberLogin] = useState<boolean>(true);
  const [isFeedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [resultLogin, setResultLogin] = useState<AuthResult>({status: false, message: ""});
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      setFeedbackVisible(true);
    }, 100);
    const form = e.currentTarget;
    if(form.checkValidity()) {
      const resultSubmitLogin: AuthResult = await SubmitLogin(usernameLogin, passwordLogin, rememberLogin);
      setResultLogin(resultSubmitLogin);
      console.log(resultSubmitLogin.message);
      if(resultSubmitLogin.status == true){
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    }else{
      setResultLogin({status: false, message: "Invalid entries"});
    }
  }

  return (
    <>
      <img className="h-24" src="./images/logo-pixel-post.png" alt="logo" />
      <form
        className="flex flex-col justify-center items-center w-72 xs:w-96 mt-5 md:mt-10"
        onSubmit={async (e) => await handleLogin(e)}
        noValidate
      >
        <h3 className="text-xl mb-10 font-semibold">Login</h3>
        <input
          className="bg-primary-button shadow-xl w-full h-12 text-center mb-5"
          placeholder="username..."
          value={usernameLogin}
          onChange={(e) => setUsernameLogin(e.target.value)}
          minLength={2}
          maxLength={22}
          formNoValidate
          autoFocus
          required
        />
        <input
          className="bg-primary-button shadow-xl w-full h-12 text-center "
          type="password"
          placeholder="password..."
          value={passwordLogin}
          onChange={(e) => setPasswordLogin(e.target.value)}
          minLength={4}
          maxLength={50}
          formNoValidate
          required
        />
        <div className="w-full mb-10">
          <div className="flex justify-between mt-4">
            <label htmlFor="remember" className="flex items-center">
              <input 
                className="h-4 w-4 mr-1"
                checked={rememberLogin}
                onChange={(e) => setRememberLogin(e.target.checked)}
                id="remember" 
                type="checkbox" 
              />
              <p>remember-me</p>
            </label>
            <button
              onClick={onClickChangeAuth}
            >register</button>
          </div>
        </div>
        {isFeedbackVisible && (    
          <div className={ `${resultLogin.status == true ? "bg-blue-500" : "bg-red-500"} border-2 border-secundary-button  shadow-xl w-full min-h-10 mb-5 flex items-center`}>
            <p className="text-center w-full">{resultLogin.message}</p>
          </div>
          )
        }
        {resultLogin.status == false && (
          <button type="submit" className="bg-primary-button shadow-xl w-full h-12">entry</button>
        )}
      </form>
    </>
  )
}

export default Login;