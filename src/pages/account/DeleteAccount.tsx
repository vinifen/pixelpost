import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import phpAddress from "../../components/phpAddress";

interface DeleteAccountProps {
  status: boolean;
  message: string;
}

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [resultDeleteAccount, setResultDeleteAccount] = useState<DeleteAccountProps>({status: false, message: ''});
  const [isFeedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const [isFakeDeleteButtonVisible, setFakeDeleteButtonVisible] = useState<boolean>(true);

  const submitPassword = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setTimeout(() => {
      setFeedbackVisible(true);
    }, 100);
    const form = e.currentTarget
    if(form.checkValidity()) {
      const resultSubmitDeleteAccount: DeleteAccountProps = await submitDeleteAccount(password);
      setResultDeleteAccount(resultSubmitDeleteAccount);
      if(resultSubmitDeleteAccount.status){ 
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    }else{
      setResultDeleteAccount({status: false, message: "Invalid entry"});
    }
  }

  const handleFakeButton = () => {
    setTimeout(() => {
      setFakeDeleteButtonVisible(false);
    }, 200)
  }



  return (
    <>
    <form
      className="flex flex-col justify-start items-center w-72 xs:w-96 mb-8"
      onSubmit={async (e) => await submitPassword(e)}
      noValidate
    >
      <h3 className="text-xl mb-5 font-semibold">Delete Your Account</h3>
      <input
        className="bg-primary-button shadow-xl w-full h-12 text-center mb-8"
        placeholder='password'
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        minLength={2}
        maxLength={22}
        autoFocus
        required
      />
      {isFeedbackVisible && (    
        <div className={`${resultDeleteAccount.status ? "bg-blue-500" : "bg-red-500"} border-2 border-secundary-button shadow-xl w-full min-h-10 mb-5 flex items-center`}>
          <p className="text-center w-full">{resultDeleteAccount.message}</p>
        </div>
      )}
      
      {isFakeDeleteButtonVisible ? (
        <button type="button" onClick={handleFakeButton} className="bg-red-950 shadow-xl w-full h-12">
          DELETE
        </button>
      ) : (
        <>
          {isFeedbackVisible == false && (    
            <div className={`bg-orange-800 border-2 border-secundary-button shadow-xl w-full min-h-10 mb-5 flex items-center`}>
              <p className="text-center w-full">All your data will be permanently deleted and cannot be recovered, are you sure you want to delete your account?</p>
            </div>
          )}
          <button type="submit" className="bg-red-950 shadow-xl w-full h-12">PERMANENT DELETE</button>
        </>
      )}
    </form>
    </>
  );
};

const submitDeleteAccount = async (password: string) => {
  const phpDeleteAccount = `${phpAddress}/account/deleteAccount.php`;

  try {
    const response = await axios.post<{ validator: boolean, message: string }>(phpDeleteAccount, {password}, { withCredentials: true });
    console.log(response.data.validator, response.data.message, "resultado delete");
    if(response.data.validator === true){
      return {status: true, message: response.data.message};
    }else{
      return {status: false, message: response.data.message};
    }
  } catch (error) {
    return {status: false, message: "Error on delete account"}
  }
}

export default DeleteAccount;
