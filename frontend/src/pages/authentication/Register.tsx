import { useNavigate } from "react-router-dom"
import SubmitLogin from "./SubmitLogin";
import React, { FormEvent, useState } from "react";
import SubmitRegister from "./SubmitRegister";

interface onClickChangeAuth {
  onClickChangeAuth: () => void;
}

interface AuthResult {
  status: boolean;
  message: string;
}

const Register: React.FC<onClickChangeAuth> = ({onClickChangeAuth}) => {

  

  const navigate = useNavigate();
  const [confirmPasswordRegister, setConfirmPasswordRegister] = useState<string>('');
  const [usernameRegister, setUsernameRegister] = useState<string>('');
  const [passwordRegister, setPasswordRegister] = useState<string>('');
  const [resultRegister, setResultRegister] = useState<AuthResult>({status: false, message: ""});
  const [isFeedbackVisible, setFeedbackVisible] = useState<boolean>(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      setFeedbackVisible(true);
    }, 100);
    const form = e.currentTarget;
    if (form.checkValidity()) {
      if(passwordRegister === confirmPasswordRegister){ 
        const resultSubmitRegister: AuthResult = await SubmitRegister(usernameRegister, passwordRegister);
        setResultRegister(resultSubmitRegister);
        console.log("Register Status:", resultSubmitRegister);
        console.log("Username Register:", usernameRegister);
        console.log("Password Register:", passwordRegister);
        console.log("Confirm Password:", confirmPasswordRegister);
        
        if (resultSubmitRegister.status) {
          const resultSubmitLogin: AuthResult = await SubmitLogin(usernameRegister, passwordRegister, true);
          if (resultSubmitLogin.status) {
            setTimeout(() => {
              navigate('/');
            }, 2000);
          }
        } 
      }else{
        setResultRegister({status: false, message: "Different passwords"});
      }
    }else{
      setResultRegister({status: false, message: "Invalid entries"});
    }
  };

  return (
    <>
      <img className="h-24" src="./images/logo-pixel-post.png" alt="logo" />
      <form
        className="flex flex-col justify-center items-center w-72 xs:w-96 mt-5 md:mt-10"
        onSubmit={async (e) => await handleRegister(e)}
        noValidate
      >
        <h3 className="text-xl mb-10 font-semibold">Register</h3>
        <input
          className="bg-primary-button shadow-xl w-full h-12 text-center mb-5"
          placeholder="username"
          value={usernameRegister}
          onChange={(e) => setUsernameRegister(e.target.value)}
          minLength={2}
          maxLength={22}
          required
        />
        <input
          className="bg-primary-button shadow-xl w-full h-12 text-center mb-5"
          type="password"
          placeholder="password"
          value={passwordRegister}
          onChange={(e) => setPasswordRegister(e.target.value)}
          minLength={4}
          maxLength={50}
          required
        />
        {/*editar isso*/}
        <input
          className="bg-primary-button shadow-xl w-full h-12 text-center mb-5"
          type="password"
          placeholder="confirm password"
          value={confirmPasswordRegister}
          onChange={(e) => setConfirmPasswordRegister(e.target.value)}
          maxLength={50}
        />
        {isFeedbackVisible && (    
          <div className={ `${resultRegister.status == true ? "bg-blue-500" : "bg-red-500"} border-2 border-secundary-button shadow-xl w-full min-h-10 mb-5 flex items-center`}>
            <p className="text-center w-full">{resultRegister.message}</p>
          </div>
          )
        }
        {resultRegister.status == false && (
          <button type="submit" className="bg-primary-button shadow-xl w-full h-12 my-5">entry</button>
        )}
        <button
          onClick={onClickChangeAuth}
        >
          login
        </button>
      </form>
    </>
  )
}

export default Register;