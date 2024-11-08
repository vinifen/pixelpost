import axios from "axios";
import phpAddress from "../../components/phpAddress";
const SubmitRegister = async (usernameRegister: string, passwordRegister: string) => {
  console.log(usernameRegister, passwordRegister);
  const phpSubmitRegister = `${phpAddress}/authentication/postRegister.php`;
  try {
    const response = await axios.post<{ message: string, validator: boolean }>(
      phpSubmitRegister,
      { usernameRegister, passwordRegister},
      { withCredentials: true }
    );

    if(response.data.validator === true){
      return {status: response.data.validator, message: response.data.message};
    }else{
      return {status: response.data.validator, message: response.data.message};
    }
  } catch (error) {
    console.error("Error submit register: ", error);
    return {status: false, message: "Error submit register"};
  }
};

export default SubmitRegister;
