import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import phpAddress from "../../components/phpAddress";

interface EditPasswordProps {
  status: boolean;
  message: string;
}

const EditPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [resultPasswordEdit, setResultPasswordEdit] = useState<EditPasswordProps>({status: false, message: ''});
  const [isFeedbackVisible, setFeedbackVisible] = useState<boolean>(false);

  const submitNewPassword = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setTimeout(() => {
      setFeedbackVisible(true);
    }, 100);
    const form = e.currentTarget
    if(form.checkValidity()) {
      if(newPassword === confirmNewPassword){ 
        const resultSubmitPasswordEdit: EditPasswordProps = await submitEditPassword(newPassword, oldPassword);
        setResultPasswordEdit(resultSubmitPasswordEdit);
        if(resultSubmitPasswordEdit.status){ 
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      }else{
        setResultPasswordEdit({status: false, message: "Different passwords"});
      }
    }else{
      setResultPasswordEdit({status: false, message: "Invalid entry"});
    }
  }

  return (
    <>
    <form
      className="flex flex-col justify-start items-center w-72 xs:w-96 mb-8"
      onSubmit={async (e) => await submitNewPassword(e)}
      noValidate
    >
      <h3 className="text-xl mb-5 font-semibold">Edit Password</h3>
      <input
          className="bg-primary-button shadow-xl w-full h-12 text-center mb-5"
          type="password"
          placeholder="OLD password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          minLength={4}
          maxLength={50}
          formNoValidate
          required
      />
      <input
          className="bg-primary-button shadow-xl w-full h-12 text-center mb-5"
          type="password"
          placeholder="NEW password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength={4}
          maxLength={50}
          formNoValidate
          required
        />
      <input
        className="bg-primary-button shadow-xl w-full h-12 text-center mb-8"
        type="password"
        placeholder="confirm new password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        minLength={4}
        maxLength={50}
        formNoValidate
        required
      />
      {isFeedbackVisible && (    
        <div className={ `${resultPasswordEdit.status == true ? "bg-blue-500" : "bg-red-500"} border-2 border-secundary-button  shadow-xl w-full min-h-10 mb-5 flex items-center`}>
          <p className="text-center w-full">{resultPasswordEdit.message}</p>
        </div>
        )
      }
      {resultPasswordEdit.status == false && (
        <button type="submit" className="bg-primary-button shadow-xl w-full h-12">Edit</button>
      )}
    </form>
    </>
  );
};

const submitEditPassword = async (newPassword: string, oldPassword: string) => {
  const phpEditPassword = `${phpAddress}/account/editPassword.php`;

  try {
    const response = await axios.post<{ validator: boolean, message: string }>(phpEditPassword, {newPassword, oldPassword}, { withCredentials: true });
    console.log(response.data.validator, response.data.message, "resultado Password");
    if(response.data.validator === true){
      return {status: true, message: response.data.message};
    }else{
      return {status: false, message: response.data.message};
    }
  } catch (error) {
    return {status: false, message: "Error on submit new Password"}
  }
}

export default EditPassword;
