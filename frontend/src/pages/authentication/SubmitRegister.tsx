import axios from "axios";
import phpAddress from "../../components/phpAddress";

const SubmitRegister = async (usernameRegister: string, passwordRegister: string) => {
  console.log("Enviando para:", `${phpAddress}/authentication/postRegister.php`);
  console.log("Dados enviados:", { usernameRegister, passwordRegister });

  try {
    const response = await axios.post<{ message: string, validator: boolean }>(
      `${phpAddress}/authentication/postRegister.php`,
      { usernameRegister, passwordRegister },
      { withCredentials: true }
    );

    console.log("Resposta do servidor:", response.data);

    return {
      status: response.data.validator,
      message: response.data.message,
    };

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Erro na resposta do servidor:", error.response.data);
      return { status: false, message: error.response.data?.message || "Erro ao registrar" };
    } else {
      console.error("Erro desconhecido:", error);
      return { status: false, message: "Erro desconhecido ao registrar" };
    }
  }
};

export default SubmitRegister;
