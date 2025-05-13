import { API } from "@/axios";

export interface RegisterCreate {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
    confirmSenha: string;
}

interface RegisterResponse {
    message: string;
}

interface ResponseEmail {
    existe: boolean;
}

const baseURLPostRegister = '/registerCreated';

export class PostRegister {
    static async create(payload: RegisterCreate) {
        const response = await API.put<RegisterResponse>(baseURLPostRegister, payload);
        return response.data;
    }
}

const baseURLGetEmail = '/verifica_email'
export const verificarEmail = async (email: string): Promise<boolean> => {
    try {
        const response = await API.get<ResponseEmail>(baseURLGetEmail, {
            params: { email }
        });
        return response.data.existe;
    } catch (error) {
        console.error("Erro ao verificar e-mail", error);
        return false;
    }
};
