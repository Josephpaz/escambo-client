import { API } from "@/axios";

export interface RegisterCreate {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
}

interface RegisterResponse {
    message: string;
    id: string;
}


interface ResponseEmail {
    existe: boolean;
}

const baseURLPostRegister = '/usuarios';

export class PostRegister {
    static async create(payload: RegisterCreate): Promise<RegisterResponse> {
        try {
            const response = await API.post<RegisterResponse>(baseURLPostRegister, payload);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar registro:", error);
            throw new Error("Erro ao criar o usuário.");
        }
    }
}

const baseURLGetEmail = '/verifica_email';


export const verificarEmail = async (email: string): Promise<boolean> => {
    try {
        const response = await API.get<ResponseEmail>(baseURLGetEmail, {
            params: { email }
        });
        return response.data.existe;
    } catch (error) {
        console.error("Erro ao verificar e-mail:", error);
        return false;
    }
};
