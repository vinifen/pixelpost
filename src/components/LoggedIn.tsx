import axios from "axios";
import phpAddress from "./phpAddress";

const LoggedIn = async () => {
  const phpLoggedIn = `${phpAddress}/authentication/loggedIn.php`;
  try{
    const response = await axios.post<{validator: boolean }>(
      phpLoggedIn, 
      {}, 
      { withCredentials: true }
    );
    console.log(response);
    if(response.data.validator && response.data){
      return true;
    }else{ 
      return false;
    }
  }catch(error){
    return false;
  }
}

export default LoggedIn;