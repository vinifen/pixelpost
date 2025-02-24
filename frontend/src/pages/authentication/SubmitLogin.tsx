import axios from "axios";
import phpAddress from "../../components/phpAddress";

const SubmitLogin = async (usernameLogin: string, passwordLogin: string, rememberLogin: boolean) => { 

  const phpSubmitLogin = `${phpAddress}/authentication/login.php`;
  try {
    const response = await axios.post<{ message: string, validator: boolean }>(
      phpSubmitLogin,
      { usernameLogin, passwordLogin, rememberLogin },
      { withCredentials: true }
    );
    if(response.data.validator === true){
      return {status: true, message: response.data.message};
    }else{
      return {status: false, message: response.data.message};
    }
    
  } catch (error) {
    console.error("Error submit login:", error);
    return {status: false, message: "Error submit login"};
  }
};

export default SubmitLogin;
