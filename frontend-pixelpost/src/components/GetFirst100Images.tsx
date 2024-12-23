/*disabled the uploaded background images feature
import axios from "axios";
import phpAddress from "./phpAddress";
const phpGet100Images = `${phpAddress}/account-images/getFirst100Images.php`;

const GetFirst100Images = async (): Promise<string[]> => {
  try{ 
    const response = await axios.get<{images: string[]}>(phpGet100Images, {});
    if (response.data.images) {
      console.log("Imagens recebidas:", response.data.images);
      return response.data.images;
    } else {
      console.log("Nenhuma imagem foi encontrada");
      return [];
    }
  }catch(error){
    console.error('Erro ao receber imagens', error);
    return [];
  }
}

export default GetFirst100Images;
*/