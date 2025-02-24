import axios from "axios";
import phpAddress from "./phpAddress";
const phpGetUsername = `${phpAddress}/account/getUsername.php`;

const GetUsername = async (): Promise<string> => {
  try {
    const response = await axios.post<{username: string[], validator: boolean}>(phpGetUsername, {}, { withCredentials: true });
    console.log("Identificação:", response.data.username);
      if (response.data.validator) {
        console.log("nome recebido:", response.data.username);
        const username: string = String(response.data.username); 
        return username;
      } else {
        console.log("Nenhuma nome foi encontrado");
        return "";
      }
  } catch (error) {
    console.error('Erro ao receber nome', error);
    return "";
  }
}

export default GetUsername;
