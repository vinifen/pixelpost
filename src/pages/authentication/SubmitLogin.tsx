import axios from "axios";

const SubmitLogin = async (usernameLogin: string, passwordLogin: string, rememberLogin: boolean) => { 

  const phpSubmitLogin = 'http://localhost/pixel_post-backend/authentication/login.php';
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
