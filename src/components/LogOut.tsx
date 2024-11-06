import axios from "axios"


const LogOut = async () => {
  
  const phpLogOut = 'http://localhost/pixel_post-backend/account/logOut.php';
  try {
    const response = await axios.post<{message: string}>(phpLogOut, {}, { withCredentials: true});
    console.log(response.data.message);
    
    window.location.reload();
    return response.data.message;
  } catch (error) {
    console.error(error);
    return '';
  }
}

export default LogOut;