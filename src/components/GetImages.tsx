import axios from "axios";

const phpGetImages = 'http://localhost/pixel_post-backend/account-images/getImages.php';

const GetImages = async (): Promise<string[]> => {
  try {
    const response = await axios.post<{images: string[]}>(phpGetImages, {}, { withCredentials: true });
    console.log("Identificação:", response.data.images);
      if (response.data.images) {
        console.log("Imagens recebidas:", response.data.images);
        return response.data.images;
      } else {
        console.log("Nenhuma imagem foi encontrada");
        return [];
      }
  } catch (error) {
    console.error('Erro ao receber imagem', error);
    return [];
  }
}

export default GetImages;
