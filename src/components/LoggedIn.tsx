import axios from "axios";

const LoggedIn = async () => {
  const phpLoggedIn = 'http://localhost/pixel_post-backend/authentication/loggedIn.php';
  try{
    const response = await axios.post<{validator: boolean }>(
      phpLoggedIn, 
      {}, 
      { withCredentials: true }
    );
    console.log(response + "responseasdfasdfa")
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