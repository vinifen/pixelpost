import { RefObject } from "react";
import axios from "axios";
import phpAddress from "../../components/phpAddress";

export const DownloadCanvas = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  if (canvas) {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "pixel-art.png";
    link.click();
    
  }
}
export interface UploadResult {
  status: boolean;
  message: string;
}

export const UploadCanvas = async (
  canvasRef: React.RefObject<HTMLCanvasElement>
): Promise<UploadResult> => {
  const canvas = canvasRef.current;
  const phpPostImages = `${phpAddress}/account-images/postImages.php`;

  if (!canvas) {
    return { status: false, message: "Canvas error" };
  }

  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        resolve({ status: false, message: "Upload error: Blob creation failed" });
        return;
      }

      const formData = new FormData();
      formData.append('image', blob, 'pixel-art.png');

      try {
        const response = await axios.post<{ validator: boolean; message: string }>(
          phpPostImages,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );

        if (response.data.validator) {
          resolve({ status: true, message: response.data.message });
        } else {
          resolve({ status: false, message: response.data.message });
        }
      } catch (error) {
        console.error('Erro ao enviar a imagem:', error);
        resolve({ status: false, message: "Upload error" });
      }
    }, 'image/png');
  });
};