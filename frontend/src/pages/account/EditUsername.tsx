import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import phpAddress from "../../components/phpAddress";

interface EditUsernameProps {
  status: boolean;
  message: string;
}

const EditUsername: React.FC<{ oldUsername: string }> = ({ oldUsername }) => {
  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState(oldUsername);
  const [resultUsernameEdit, setResultUsernameEdit] = useState<EditUsernameProps>({status: false, message: ''});
  const [isFeedbackVisible, setFeedbackVisible] = useState<boolean>(false);

  const submitNewUsername = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setTimeout(() => {
      setFeedbackVisible(true);
    }, 100);
    if(newUsername === oldUsername){ 
      setResultUsernameEdit({status: false, message: "The name has not been changed"})
    }else{
      const form = e.currentTarget
      if(form.checkValidity()) {
        const resultSubmitUsernameEdit: EditUsernameProps = await submitEditUsername(newUsername);
        setResultUsernameEdit(resultSubmitUsernameEdit);
          if(resultSubmitUsernameEdit.status){ 
          setTimeout(() => {
            navigate('/');
            
          }, 2000);
        }
      }else{
        setResultUsernameEdit({status: false, message: "Invalid entries"});
      }
    }
  }

  return (
    <>
    <form
      className="flex flex-col justify-start items-center w-72 xs:w-96 mb-8"
      onSubmit={async (e) => await submitNewUsername(e)}
      noValidate
    >
      <h3 className="text-xl mb-5 font-semibold">Edit Username</h3>
      <input
        className="bg-primary-button shadow-xl w-full h-12 text-center mb-8"
        placeholder={oldUsername}
        value={newUsername} 
        onChange={(e) => setNewUsername(e.target.value)} 
        minLength={2}
        maxLength={22}
        autoFocus
        required
      />
      {isFeedbackVisible && (    
        <div className={ `${resultUsernameEdit.status == true ? "bg-blue-500" : "bg-red-500"} border-2 border-secundary-button  shadow-xl w-full min-h-10 mb-5 flex items-center`}>
          <p className="text-center w-full">{resultUsernameEdit.message}</p>
        </div>
        )
      }
      {resultUsernameEdit.status == false && (
        <button type="submit" className="bg-primary-button shadow-xl w-full h-12">Edit</button>
      )}
    </form>
    </>
  );
};

const submitEditUsername = async (newUsername: string) => {
  const phpEditUsername = `${phpAddress}/account/editUsername.php`;

  try {
    const response = await axios.post<{ validator: boolean, message: string }>(phpEditUsername, { newUsername}, { withCredentials: true });
    if(response.data.validator === true){
      return {status: true, message: response.data.message};
    }else{
      return {status: false, message: response.data.message};
    }
  } catch (error) {
    return {status: false, message: "Error on submit new username"}
  }
}

export default EditUsername;
